require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('executed query', {text, duration, rows: res.rowCount});
        return res;
    } catch (err) {
        console.error('error in query', { text, error: err});
        throw err;
    }
};

const testConnection = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Database connection successful!');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
};

testConnection();

module.exports = { query, pool };