const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      res.locals.user = req.user;
    } catch (error) {
      res.clearCookie('jwt');
      req.user = null;
      res.locals.user = null;
    }
  } else {
    req.user = null;
    res.locals.user = null;
  }
  next();
};

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
