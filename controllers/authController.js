const axios = require('axios');
const jwt = require('jsonwebtoken');

exports.loginForm = (req, res) => {
  res.render('login', { user: req.user, error: null });
};

exports.registerForm = (req, res) => {
  res.render('register', { user: req.user });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Login Request:', req.body); // Log de la solicitud de inicio de sesión
  try {
    const response = await axios.post('http://localhost:4000/api/auth/login', { username, password });
    const token = response.data.token;
    res.cookie('jwt', token, { httpOnly: true });
    console.log('Login Successful, Token:', token); // Log del token recibido
    res.redirect('/');
  } catch (error) {
    console.error('Login Error:', error.response ? error.response.data : error.message); // Log del error
    res.render('login', { user: null, error: error.response.data.error });
  }
};

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log('Register Request:', req.body); // Log de la solicitud de registro
  try {
    await axios.post('http://localhost:4000/api/auth/register', { username, email, password, confirmPassword });
    console.log('Register Successful'); // Log del registro exitoso
    res.redirect('/login');
  } catch (error) {
    console.error('Register Error:', error.response ? error.response.data : error.message); // Log del error
    res.render('register', { user: null, error: error.response.data.error });
  }
};

exports.logout = async (req, res) => {
  await axios.get('http://localhost:4000/api/auth/logout');
  console.log('Logout Successful'); // Log de cierre de sesión exitoso
  res.clearCookie('jwt');
  res.redirect('/');
};

exports.protect = (req, res, next) => {
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
