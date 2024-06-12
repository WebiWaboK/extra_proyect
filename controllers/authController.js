const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'claveSecretaJWT';

exports.loginForm = (req, res) => {
  res.render('login', { user: req.user });
};

exports.registerForm = (req, res) => {
  res.render('register', { user: req.user });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User(username, null, password);
    const response = await user.login();
    const token = response.token;
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
};

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log('Register request body:', req.body);
  try {
    const user = new User(username, email, password, confirmPassword);
    const response = await user.register();
    console.log('Registration response:', response);
    res.redirect('/');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};

exports.protect = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      res.locals.user = req.user; // Make user available in all templates
    } catch (error) {
      res.clearCookie('jwt');
    }
  }
  next();
};
