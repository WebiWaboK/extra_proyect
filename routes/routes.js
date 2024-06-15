const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmiController');
const authController = require('../controllers/authController');

// Asegúrate de que todos los controladores están definidos
if (!bmiController || !authController) {
  console.error('Controllers not defined');
  process.exit(1);
}

// Definir las rutas y asegurarse de que los métodos de los controladores existen
router.get('/', authController.protect, bmiController.index);
router.post('/calculate', bmiController.calculate);
router.get('/login', authController.loginForm);
router.get('/register', authController.registerForm);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

module.exports = router;
