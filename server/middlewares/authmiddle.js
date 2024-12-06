const jwt = require('jsonwebtoken');
require('dotenv').config();

const superAdminAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded.role !== 'superadmin') {
            return res.status(403).send('Unauthorized: Admins cannot access SuperAdmin routes');
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

module.exports = { superAdminAuth };
