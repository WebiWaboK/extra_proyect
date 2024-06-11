const BMI = require('../models/bmi');

exports.index = (req, res) => {
  res.render('index');
};

exports.calculate = async (req, res) => {
  const { weight, height } = req.body;
  try {
    const bmi = new BMI(weight, height);
    const result = await bmi.calculate();
    console.log('Result from API:', result);
    res.json(result);
  } catch (error) {
    console.error('Error calculating BMI:', error.message);
    res.status(500).json({ error: error.message || 'Error calculating BMI' });
  }
};
