const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmiController');
const authController = require('../controllers/authController');
const protect = require('../middlewares/protect');

router.get('/', protect, bmiController.index);
router.post('/calculate', bmiController.calculate);
router.get('/login', authController.loginForm);
router.get('/register', authController.registerForm);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

module.exports = router;
