const axios = require('axios');

class User {
  constructor(username, email, password, confirmPassword) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

  async register() {
    try {
      const response = await axios.post('http://localhost:4000/api/users/register', {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
      console.log('API Register response:', response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error.response.data); // Debugging
      throw new Error('Error registering user');
    }
  }

  async login() {
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
        username: this.username,
        password: this.password,
      });
      console.log('API Login response:', response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error('Error logging in user:', error.response.data); // Debugging
      throw new Error('Error logging in user');
    }
  }
}

module.exports = User;
