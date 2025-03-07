const { query } = require('../config/db');

const Customer = {
  createTable: async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await query(createTableQuery);
  },

  create: async (name, phone_number, address) => {
    const insertQuery = 'INSERT INTO customers (name, phone_number, address) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, phone_number, address];
    const result = await query(insertQuery, values);
    return result.rows[0];
  },

  getAll: async () => {
    const text = 'SELECT * FROM customers'; // Pastikan query SQL benar
    try {
      const res = await query(text);
      console.log("SQL Result (res.rows):", res.rows); // Tambahkan log ini
      return res.rows;
    } catch (err) {
      console.error("Error in Customer.getAll:", err.stack); // Gunakan err.stack
      throw err; // Re-throw error
    }
  },
  
  findById: async (id) => {
    const text = 'SELECT * FROM customers WHERE id = $1';
    try {
      const res = await query(text, [id]);
      return res.rows[0];
    } catch (error) {
      console.error('Error in Customer.findById:', error);
      throw error;
    }
  },

  update: async (id, name, phone_number, address) => {
    const updateQuery = 'UPDATE customers SET name = $1, phone_number = $2, address = $3 WHERE id = $4 RETURNING *';
    const values = [id, name, phone_number, address];
    const result = await query(updateQuery, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const deleteQuery = 'DELETE FROM customers WHERE id = $1';
    await query(deleteQuery, [id]);
  },
};

module.exports = Customer;