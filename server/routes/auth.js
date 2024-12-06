const express = require('express');
const router = express.Router();
const { createAdmin, loginAdmin } = require('../controllers/auth');
const { superAdminAuth } = require('../middlewares/authmiddle');

router.post('/signup',createAdmin);
router.post('/login', loginAdmin);
router.post('/create-admin', superAdminAuth, createAdmin);

module.exports = router;
