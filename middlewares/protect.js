const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('JWT Token:', token); // Log del token JWT
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
      req.user = decoded;
      res.locals.user = req.user;
      console.log('Session User:', req.user); // Log del usuario en sesión
    } catch (error) {
      console.error('JWT Verification Error:', error); // Log del error de verificación JWT
      res.clearCookie('jwt');
    }
  }
  next();
};
