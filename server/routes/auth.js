const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createSuperAdmin, loginSuperAdmin } = require('../controllers/auth');

router.post('/signup', createSuperAdmin); 
router.post('/login', loginSuperAdmin); 

module.exports = router;
