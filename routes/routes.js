const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmiController');
//const authController = require('../controllers/authController');

router.get('/', bmiController.index);
router.post('/calculate', bmiController.calculate);

module.exports = router;
