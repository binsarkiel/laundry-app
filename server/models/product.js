const { query } = require('../config/db');

const Product = {

  createTable: async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await query(createTableQuery);
  },

  create: async (name, price) => { //Pastikan ada method create
    const text = 'INSERT INTO products(name, price) VALUES($1, $2) RETURNING *';
    const values = [name, price];

    try {
        const res = await query(text, values);
        return res.rows[0];

    } catch (err) {
        console.error("Create Product Error:",err.stack); //Pakai console.error
        throw err;  //rethrow error
    }

},

getAll: async () => {
  const text = 'SELECT * FROM products';
  try {
      const res = await query(text);
      console.log("SQL Result (res.rows):", res.rows); // Tambahkan log ini
      return res.rows;
  } catch (err) {
      console.error("Error in Product.getAll:", err.stack); // Gunakan err.stack, dan tambahkan context
      throw err; // Re-throw error
  }
},

findById: async (id) => {
  const text = 'SELECT * FROM products WHERE id = $1';
  try {
      const res = await query(text, [id]);
       if (res.rows.length === 0) {
          return null;
      }
      return res.rows[0];
  } catch (error) {
      console.error('Error in Product.findById:', error);
      throw error;
  }
},

  update: async (id, name, price) => {
      const updateQuery = 'UPDATE products SET name = $2, price = $3 WHERE id = $1 RETURNING *';
      const values = [id, name, price];
      const result = await query(updateQuery, values);
      return result.rows[0];
  },

    delete: async (id) => {
        const deleteQuery = 'DELETE FROM products WHERE id = $1';
        await query(deleteQuery, [id]);
    },

};

module.exports = Product;