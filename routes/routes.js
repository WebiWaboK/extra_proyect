const express = require('express');
const router = express.Router();

// Controladores
const bmiController = require('../controllers/bmiController');

// Rutas
router.get('/', bmiController.index);

module.exports = router;
