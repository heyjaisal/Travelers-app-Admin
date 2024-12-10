const jwt = require('jsonwebtoken');
require('dotenv').config();

const superAdminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).send('Access denied: No token provided.');

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (decoded.role !== 'superadmin') {
            return res.status(403).send('Unauthorized: Only SuperAdmins can access this route');
        }

        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send('Token expired. Please log in again.');
        }
        console.error(err);
        res.status(400).send('Invalid token');
    }
};

module.exports = { superAdminAuth };

