// backend/models/transaction.js
const { query } = require('../config/db');

const Transaction = {
    createTable: async () => { // Pastikan ada createTable, untuk migration.
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            transaction_code VARCHAR(50) UNIQUE NOT NULL,
            customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
            total_amount NUMERIC(10, 2) NOT NULL,
            transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        await query(createTableQuery);
    },
    create: async (transaction_code, customer_id, total_amount) => {
        const text = 'INSERT INTO transactions(transaction_code, customer_id, total_amount) VALUES($1, $2, $3) RETURNING *';
        const values = [transaction_code, customer_id, total_amount];
        try {
            const res = await query(text, values);
            return res.rows[0];
        } catch (err) {
            console.log(err.stack);
            throw err; // Re-throw error
        }
    },
    // Mengambil semua transaksi *dengan nama customer* (untuk TransactionPage)
    findAllWithCustomerName: async () => {
        const text = `
            SELECT t.*, c.name AS customer_name, c.id AS customer_id
            FROM transactions t
            JOIN customers c ON t.customer_id = c.id
        `;
        try {
            const res = await query(text);
            return res.rows;
        } catch (err) {
            console.log(err.stack);
            throw err; // Re-throw error
        }
    },

    findByCustomerId: async (customer_id) => {
        const text = `
            SELECT
                t.transaction_code,
                t.transaction_date,
                p.name AS product_name,
                td.quantity,
                td.subtotal,
                td.id as detail_id
            FROM
                transactions t
            JOIN
                transaction_details td ON t.id = td.transaction_id
            JOIN
                products p ON td.product_id = p.id
            JOIN
                customers c ON t.customer_id = c.id
            WHERE c.id = $1;
        `;
        try {
            const res = await query(text, [customer_id]);
            console.log("SQL Result (res.rows - findByCustomerId):", res.rows); // Tambahkan ini untuk debugging
            return res.rows;
        } catch (err) {
            console.error("Error in Transaction.findByCustomerId:", err.stack); // Logging yang lebih baik
            throw err;
        }
    },
    

    //Anda mungkin tidak butuh ini lagi, karena sudah ada findAllWithCustomerName.
    getAll: async () => {
        const selectQuery = 'SELECT * FROM transactions';
        const result = await query(selectQuery);
        return result.rows;
    },
    findById: async (id) => { // findById, untuk detail transaksi
        const selectQuery = 'SELECT * FROM transactions WHERE id = $1';
        const result = await query(selectQuery, [id]);
        return result.rows[0];
    },
};

module.exports = Transaction;