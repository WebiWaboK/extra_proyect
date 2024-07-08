const axios = require('axios');

exports.getData = async (req, res) => {
  const token = req.cookies.jwt;

  try {
    const response = await axios.get('http://localhost:4000/api/data', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { bmiData, igcData } = response.data;

    res.render('datos', {
      title: 'Tus Datos',
      user: req.user,
      bmiData,
      igcData
    });
  } catch (error) {
    console.error('Error al obtener los datos desde la API:', error);
    res.status(500).send('Error al obtener los datos');
  }
};
