import axios from 'axios';

const API_URL = 'http://localhost:5000/api/customers';

export const customerService = {
  createCustomer: async (name, phone_number, address) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_URL, { name, phone_number, address }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Create customer error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  getAllCustomers: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Get All customer error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },
  getCustomerById: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`<span class="math-inline">\{API\_URL\}/</span>{id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Get Customer By Id Error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message }
    }
  },
  updateCustomer: async (id, name, phone_number, address) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`<span class="math-inline">\{API\_URL\}/</span>{id}`, { customer_code, name, phone_number, address }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Update customer error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  deleteCustomer: async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`<span class="math-inline">\{API\_URL\}/</span>{id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return { success: true };
    } catch (error) {
      console.error("Delete customer error:", error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },
}
