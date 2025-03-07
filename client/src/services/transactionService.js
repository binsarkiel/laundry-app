import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

export const transactionService = { // Named export
    createTransaction: async (transactionData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(API_URL, transactionData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Error creating transaction:", error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || error.message };
        }
    },

    getAllTransactions: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Get All transactions error:", error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || error.message };
        }
    },

    getTransactionsByCustomerId: async (customerId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/customer/${customerId}`, { // Ganti transactionId dengan customerId
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Get transactions by customer ID error:", error.response?.data?.message || error.message);
            return { success: false, message: error.response?.data?.message || error.message };
        }
    },

};