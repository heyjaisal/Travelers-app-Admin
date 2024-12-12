const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require('../models/adminModel');
require("dotenv").config();

const createSuperAdmin = async (req, res) => {
  const { name, email, password, role, position } = req.body;
  console.log(name);
  

  try {

    const existingSuperAdmin = await Admin.findOne({ role: 'superadmin' });
    if (existingSuperAdmin) {
      return res.status(403).send('A Super Admin already exists.');
    }

    const salt = await bcrypt.genSalt(10);  
    const hashedPassword = await bcrypt.hash(password, salt);  

    
    const newSuperAdmin = new Admin({
      name,
      email,
      password: hashedPassword, 
      role: role || 'superadmin',
      position: position || 'Chief Manager',
    });

    await newSuperAdmin.save();
    res.status(201).send('Super Admin created successfully.');
  } catch (error) {
    console.error('Error creating Super Admin:', error);
    res.status(500).send('Internal server error.');
  }
};

const createAdmin = async (req, res) => {
  try {
      const { name, email, personalEmail, mobile, password, position } = req.body;

 
      const existingAdmin = await Admin.findOne({
          where: {
              $or: [
                  { email }, 
                  { mobile } 
              ]
          }
      });

      if (existingAdmin) {
          if (existingAdmin.email === email) {
              return res.status(400).json({ error: 'Email is already in use' });
          }
          if (existingAdmin.mobile === mobile) {
              return res.status(400).json({ error: 'Mobile number is already in use' });
          }
      }


      const hashedPassword = await bcrypt.hash(password, 10);


      const newAdmin = await Admin.create({
          name,
          email,
          personalEmail,
          mobile,
          password: hashedPassword,
          position,
          image: req.file?.location,
      });

   
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
          },
      });

      const mailOptions = {
          from: process.env.SMTP_USER,
          to: personalEmail,
          subject: 'Admin Account Created',
          text: `Your admin account has been created.\n\nLogin Email: ${email}\nPassword: ${password}`,
      };

      await transporter.sendMail(mailOptions);

      res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const loginSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await Admin.findOne({ email, role: 'superadmin' });
    if (!user) {
      return res.status(404).json({ error: 'Super Admin not found.' });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

  
    res.status(200).json({
      message: 'Super Admin logged in successfully.',
      token,
      dashboard: 'home',
    });
  } catch (error) {
    console.error('Error during Super Admin login:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


module.exports = { createAdmin, loginSuperAdmin, createSuperAdmin };
