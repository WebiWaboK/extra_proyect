const BMI = require('../models/bmi');

exports.index = (req, res) => {
  res.render('index', { user: req.user });
};

exports.calculate = async (req, res) => {
  const { weight, height } = req.body;
  try {
    const bmi = new BMI(weight, height);
    const result = await bmi.calculate();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error calculating BMI' });
  }
};
