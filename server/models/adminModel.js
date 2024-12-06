const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
    name: { type: String, required: true },
    position: { type: String, required: false }, // For admins only
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
