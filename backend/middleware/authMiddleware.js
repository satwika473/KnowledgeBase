const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Extract the token string after "Bearer "
  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) {
    return res.status(401).json({ error: 'Token format invalid' });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use consistent naming
    req.user = decoded; // Make email/id available in the request
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
