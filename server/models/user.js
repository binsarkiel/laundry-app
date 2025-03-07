const { query } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  // Membuat tabel users
  createTable: async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await query(createTableQuery);
  },

  // Membuat user baru
  create: async (username, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const insertQuery = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, hashedPassword, role];
    const result = await query(insertQuery, values);
    return result.rows[0];
  },
  // Mencari user berdasarkan username
  findByUsername: async (username) => {
      const selectQuery = 'SELECT * FROM users WHERE username = $1';
      const result = await query(selectQuery, [username]);
      return result.rows[0];
    },

    // Mencari user berdasarkan ID
    findById: async (id) => {
        const selectQuery = 'SELECT * FROM users WHERE id = $1';
        const result = await query(selectQuery, [id]);
        return result.rows[0];
      },

    // ... Tambahkan method lain jika diperlukan (update, delete, dll.)
};

module.exports = User;