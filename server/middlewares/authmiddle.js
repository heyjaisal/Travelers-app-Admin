const jwt = require('jsonwebtoken');

const verifySuperAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(403).json({ error: 'Token is required for authentication.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the role is superadmin
    if (decoded.role !== 'superadmin') {
      return res.status(403).json({ error: 'Unauthorized access.' });
    }

    // Attach decoded token data to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = verifySuperAdmin;
