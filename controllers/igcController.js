const axios = require('axios');

exports.igcForm = (req, res) => {
  res.render('igc', { user: req.user, error: null });
};

exports.calculateIGC = async (req, res) => {
  const { weight, waist, hip, neck, height, gender } = req.body;
  try {
    const token = req.cookies.jwt;
    const response = await axios.post('http://localhost:4000/api/igc/calculate', 
      { weight, waist, hip, neck, height, gender }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    const { igc, category, recommendations } = response.data;
    res.render('igcResults', { igc, category, recommendations });
  } catch (error) {
    console.error('Calculate Error:', error);
    res.render('igc', { user: req.user, error: error.message });
  }
};
