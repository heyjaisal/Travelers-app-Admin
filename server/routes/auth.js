const express = require('express');
const router = express.Router();
const { createAdmin, createSuperAdmin,loginSuperAdmin } = require('../controllers/auth');
const { superAdminAuth } = require('../middlewares/authmiddle');
const upload = require('../middlewares/upload')



router.post('/signup', createSuperAdmin);


router.post('/create-admin', superAdminAuth,upload.single('image'), createAdmin);

router.post('/login', loginSuperAdmin);

module.exports = router;
