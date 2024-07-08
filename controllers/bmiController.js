const axios = require('axios');

exports.index = (req, res) => {
  res.render('index', { user: req.user });
};

exports.calculate = async (req, res) => {
  const { weight, height } = req.body;
  const token = req.cookies.jwt;

  try {
    console.log('Solicitud de cálculo de BMI desde web:', req.body); // Verificar datos enviados
    console.log('Token enviado a la API:', token); // Verificar el token enviado
    const response = await axios.post('http://localhost:4000/api/bmi/calculate', 
      { weight, height }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    const result = response.data;
    console.log('Respuesta del cálculo de BMI desde la API:', result); // Verificar la respuesta de la API
    res.json(result);
  } catch (error) {
    console.error('Error al calcular el BMI desde web:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response ? error.response.data.error : error.message });
  }
};
