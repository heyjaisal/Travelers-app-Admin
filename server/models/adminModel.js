const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    personalEmail: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String }, // URL of the uploaded image
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
