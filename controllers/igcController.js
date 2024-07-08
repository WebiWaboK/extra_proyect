const axios = require('axios');

exports.igcForm = (req, res) => {
  res.render('igc', { user: req.user, error: null });
};

exports.calculateIGC = async (req, res) => {
  const { weight, waist, hip, neck, height, gender } = req.body;
  const userId = req.user.id; // Obtener el ID del usuario logueado

  try {
    const token = req.cookies.jwt;
    console.log('Solicitud de cálculo de IGC:', req.body);
    const response = await axios.post('http://localhost:4000/api/igc/calculate', 
      { userId, weight, waist, hip, neck, height, gender }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    const { igc, category, recommendations } = response.data;
    console.log('Respuesta del cálculo de IGC:', response.data);
    res.render('igcResults', { igc, category, recommendations });
  } catch (error) {
    console.error('Error al calcular el IGC:', error);
    res.render('igc', { user: req.user, error: error.message });
  }
};
