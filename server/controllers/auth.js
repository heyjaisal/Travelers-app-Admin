const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require('../models/adminModel');
require("dotenv").config();

const createAdmin = async (req, res) => {
    const { name, email, password, role, position } = req.body;

    try {
       
        const existingSuperAdmin = await Admin.findOne({ role: 'superadmin' });
        if (!existingSuperAdmin) {
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const newSuperAdmin = new Admin({
                name,
                email,
                password: hashedPassword,
                role: 'superadmin',  
            });
            await newSuperAdmin.save();
            return res.status(201).send(`Superadmin created successfully.`);
        }

        
        if (role === 'superadmin') {
            return res.status(403).send('A super-admin already exists. Cannot create another.');
        }

  
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User with this email already exists.');
        }

  
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Admin({
            name,
            email,
            password: hashedPassword,
            role: role || 'admin', 
            position: role === 'admin' ? position : undefined,
        });

        await newUser.save();

        res.status(201).send(`User created successfully as ${role || 'admin'}.`);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal server error.');
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid credentials.');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

        const dashboard = user.role === 'superadmin' ? 'superadmin-dashboard' : 'admin-dashboard';

        res.status(200).send({
            message: `Logged in successfully as ${user.role}.`,
            token,
            dashboard
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error.');
    }
};

module.exports = { createAdmin, loginAdmin };
