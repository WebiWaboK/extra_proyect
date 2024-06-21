const axios = require('axios');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

exports.loginForm = (req, res) => {
  res.render('login', { user: req.user, error: null });
};

exports.registerForm = (req, res) => {
  res.render('register', { user: req.user, error: null });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post('http://localhost:4000/api/auth/login', { username, password });
    const token = response.data.token;
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    res.render('login', { user: null, error: error.response.data.error });
  }
};

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    await axios.post('http://localhost:4000/api/auth/register', { username, email, password, confirmPassword });
    res.redirect('/login');
  } catch (error) {
    res.render('register', { user: null, error: error.response.data.error });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};
