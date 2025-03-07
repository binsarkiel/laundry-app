// backend/controllers/transactionController.js
const Transaction = require('../models/transaction');
const TransactionDetail = require('../models/transactionDetail');
const { pool } = require('../config/db'); // Import pool
const Product = require('../models/product');
const { v4: uuidv4 } = require('uuid');

const transactionController = {
    createTransaction: async (req, res) => {
        const client = await pool.connect(); // Ambil koneksi dari pool
        try {
            await client.query('BEGIN');

            const { customer_id, products } = req.body; //terima data customer_id dan products

            if (!customer_id || !products || !Array.isArray(products) || products.length === 0) {
                throw { statusCode: 400, message: 'Invalid transaction data' };
            }

            let total_amount = 0;
            for (const item of products) {
                const product = await Product.findById(item.product_id);
                if (!product) {
                   throw { statusCode: 400, message: `Product with ID ${item.product_id} not found` };
                }
                total_amount += product.price * item.quantity;
            }

            const transaction_code = uuidv4(); // Generate UUID
            const newTransaction = await Transaction.create(transaction_code, customer_id, total_amount);  // Menyimpan ke tabel transactions.
            const transactionId = newTransaction.id

            // Insert ke transaction_details
            for (const item of products) {
              const product = await Product.findById(item.product_id);
              const subtotal = product.price * item.quantity;
              await TransactionDetail.create(transactionId, item.product_id, item.quantity, subtotal); // Menyimpan ke tabel transaction_details
            }

            await client.query('COMMIT');
            res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction }); // Kirim respons sukses
        } catch (error) {
            await client.query('ROLLBACK');
             console.error("Error Create Transaction:",error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ message: error.message || 'Error creating transaction', error: error.message });
        } finally {
            client.release();
        }
    },

    getAllTransactions: async (req, res) => {
        try {
            const transactions = await Transaction.findAllWithCustomerName(); // Menggunakan findAllWithCustomerName
            res.status(200).json(transactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
            res.status(500).json({ message: 'Error fetching transactions', error: error.message });
        }
    },

    getTransactionsByCustomerId: async (req, res) => {
        try {
          const { customer_id } = req.params;
          const transactions = await Transaction.findByCustomerId(parseInt(customer_id, 10)); // Sudah benar
          res.status(200).json(transactions);
        } catch (error) {
          console.error("Error getting transactions by customer ID:", error);
          res.status(500).json({ message: 'Error getting transactions', error: error.message });
        }
      },
};

module.exports = transactionController;