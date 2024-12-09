const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require('../models/adminModel');
require("dotenv").config();

const createSuperAdmin = async (req, res) => {
  const { name, email, password, role, position } = req.body;
  console.log(name);
  

  try {
    // Check if a Super Admin already exists
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


// Create Admin
const createAdmin = async (req, res) => {
    const { name, email, mobile, password, role, position } = req.body;
    const image = req.file;
  
    try {
      
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Admin with this email already exists.');
      }
  
      const existingMobile = await Admin.findOne({ mobile });
      if (existingMobile) {
        return res.status(400).send('Admin with this mobile number already exists.');
      }
  
      
      let cloudinaryResult = null;
      if (image) {
        cloudinaryResult = await cloudinary.uploader.upload(image.path, {
          folder: 'admins',
        });
      }
  
      const newAdmin = new Admin({
        name,
        email,
        mobile,
        password,
        role: role || 'admin',
        position,
        image: cloudinaryResult ? cloudinaryResult.secure_url : null,
      });
  
      await newAdmin.save();
      res.status(201).send('Admin created successfully.');
    } catch (error) {
      console.error('Error creating Admin:', error);
      res.status(500).send('Internal server error.');
    }
  };

  const loginSuperAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {

      const user = await Admin.findOne({ email, role: 'superadmin' });
      if (!user) {
        return res.status(404).send('Super Admin not found.');
      }
  

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send('Invalid credentials.');
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
     
      res.status(200).send({
        message: 'Super Admin logged in successfully.',
        token,
        dashboard: 'superadmin-dashboard', 
      });
    } catch (error) {
      console.error('Error during Super Admin login:', error);
      res.status(500).send('Internal server error.');
    }
  };


module.exports = { createAdmin, loginSuperAdmin, createSuperAdmin };
