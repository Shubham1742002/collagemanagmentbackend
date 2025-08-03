const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Public routes that don’t need JWT
  const publicPaths = [
    '/api/auth/login',
    '/api/auth/register'
  ];

  if (publicPaths.includes(req.path)) {
    return next();
  }

  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};