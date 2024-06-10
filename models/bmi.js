const axios = require('axios');

exports.create = async (entry) => {
  try {
    const response = await axios.post('http://localhost:4000/api/bmi_entries', entry);
    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.findAllByUserId = async (user_id) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/bmi_entries/user/${user_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
