const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

const protect = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      res.locals.user = req.user;
      next();
    } catch (error) {
      res.clearCookie('jwt');
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
};

module.exports = protect;
module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
