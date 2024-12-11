const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createSuperAdmin, loginSuperAdmin, createAdmin } = require('../controllers/auth');
const { superAdminAuth } = require('../middlewares/authmiddle');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post('/signup', createSuperAdmin); 
router.post('/create-admin', superAdminAuth, upload.single("profileImage"), createAdmin); 
router.post('/login', loginSuperAdmin); 
// router.post('/verify', superAdminAuth); // Verify superadmin token

module.exports = router;
