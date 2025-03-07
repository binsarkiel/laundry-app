// backend/models/transactionDetail.js
const { query } = require('../config/db');

const TransactionDetail = {
  createTable: async () => {  //Pastikan ada createTable method
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS transaction_details (
        id SERIAL PRIMARY KEY,
        transaction_id INTEGER REFERENCES transactions(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        quantity NUMERIC(10, 2) NOT NULL,
        subtotal NUMERIC(10, 2) NOT NULL
      );
    `;
    await query(createTableQuery);
  },
    create: async (transaction_id, product_id, quantity, subtotal) => {
        const text = 'INSERT INTO transaction_details (transaction_id, product_id, quantity, subtotal) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [transaction_id, product_id, quantity, subtotal];
        try {
            const res = await query(text, values);
            return res.rows[0];
        } catch (err) {
            console.log(err.stack);
            throw err; // Re-throw error
        }
    },
};

module.exports = TransactionDetail;