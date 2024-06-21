const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmiController');
const authController = require('../controllers/authController');
const igcController = require('../controllers/igcController');
const protect = require('../middlewares/protect');

router.get('/', protect, bmiController.index);
router.post('/calculate', bmiController.calculate);

router.get('/login', authController.loginForm);
router.post('/login', authController.login);
router.get('/register', authController.registerForm);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

router.get('/igc', protect, igcController.igcForm);
router.post('/igc/calculate', protect, igcController.calculateIGC);

module.exports = router;
