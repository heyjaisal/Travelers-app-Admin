const express = require('express');
const router = express.Router();
const { createSuperAdmin, loginSuperAdmin, createAdmin, Getadmin } = require('../controllers/auth');
const verifySuperAdmin = require('../middlewares/authmiddle');
const upload = require('../config/asw');
const Admin = require('../models/adminModel');


router.post('/signup', createSuperAdmin); 
router.post('/login', loginSuperAdmin); 
// router.post('/create-admin',verifySuperAdmin,upload.single('profileImage'), createAdmin)
router.post('/create-admin',verifySuperAdmin, createAdmin)
router.get('/get-admin',Getadmin)

module.exports = router;
