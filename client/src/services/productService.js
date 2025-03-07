// frontend/src/services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products'; // Ganti dengan URL backend Anda

export const productService = {
  createProduct: async (name, price) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.post(API_URL, { name, price }, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      return {success: true, data: response.data};
    } catch (error) {
      console.error("Create product error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  getAllProducts: async () => {
    try {
      const response = await axios.get(API_URL);
      return {success: true, data: response.data};
    } catch (error) {
        console.error("Get All products error:", error.response?.data?.message || error.message);
        return { success: false, message: error.response?.data?.message || error.message };
    }
  },
    getProductById: async (id) => {
        try{
            const response = await axios.get(`<span class="math-inline">\{API\_URL\}/</span>{id}`);
            return {success: true, data: response.data};
        }catch (error) {
            console.error("Get Product By Id Error:", error.response?.data?.message || error.message);
            return {success: false, message: error.response?.data?.message || error.message}
        }
    },

  updateProduct: async (id, name,  price) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.put(`<span class="math-inline">\{API\_URL\}/</span>{id}`, { name, price }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      return {success: true, data: response.data};
    } catch (error) {
        console.error("Update product error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  deleteProduct: async (id) => {
    try {
        const token = localStorage.getItem('token');
      await axios.delete(`<span class="math-inline">\{API\_URL\}/</span>{id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });
      return {success: true};
    } catch (error) {
        console.error("Delete product error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },
};
