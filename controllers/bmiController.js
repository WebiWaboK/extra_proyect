const axios = require('axios');

exports.index = (req, res) => {
  res.render('index', { user: req.user });
};

exports.calculate = async (req, res) => {
  const { weight, height } = req.body;
  console.log('Calculate Request:', req.body); // Log de la solicitud de cálculo
  try {
    const response = await axios.post('http://localhost:4000/api/bmi/calculate', { weight, height });
    const result = response.data;
    console.log('Calculate Response:', result); // Log de la respuesta de cálculo
    res.json(result);
  } catch (error) {
    console.error('Calculate Error:', error.response ? error.response.data : error.message); // Log del error
    res.status(500).json({ error: error.response ? error.response.data.error : error.message });
  }
};
