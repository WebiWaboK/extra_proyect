const axios = require('axios');

class BMI {
  constructor(weight, height) {
    this.weight = weight;
    this.height = height;
  }

  async calculate() {
    try {
      const response = await axios.post('http://localhost:4000/api/calculate', {
        weight: this.weight,
        height: this.height,
      });
      return response.data;
    } catch (error) {
      throw new Error('Error calculating BMI');
    }
  }
}

module.exports = BMI;
