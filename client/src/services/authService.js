import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Ganti dengan URL backend Anda

export const authService = { // Named export
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      return { success: true, data: response.data }; // Return token dan user data
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  register: async (username, password, role) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { username, password, role });
      return { success: true, data: response.data}; // Return token
    } catch (error) {
      console.error("Register error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  checkAuth: async () => { // <--- Fungsi checkAuth ditambahkan di sini
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { success: false, message: 'No token found' }; // Tidak ada token
      }
      const response = await axios.get(`${API_URL}/check-auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true, data: response.data.data }; // Perhatikan .data.data
    } catch (error) {
        console.error("Check auth error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },
};