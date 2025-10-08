const jwt = require('jsonwebtoken');

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  const secret = process.env.JWT_SECRET || 'dev_fallback_secret_change_me';
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.userId = null;
    return next();
  }

  const secret = process.env.JWT_SECRET || 'dev_fallback_secret_change_me';
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      req.userId = null;
    } else {
      req.userId = decoded.userId;
    }
    next();
  });
};

module.exports = {
  authenticateToken,
  optionalAuth
};
