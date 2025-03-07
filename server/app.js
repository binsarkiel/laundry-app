require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.BE_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use('/api/auth', authRoutes);        // Endpoint untuk autentikasi
app.use('/api/products', productRoutes);    // Endpoint untuk produk
app.use('/api/customers', customerRoutes); // Endpoint untuk customer
app.use('/api/transactions', transactionRoutes); // Endpoint untuk transaksi

//Test endpoint
app.get('/', (req, res) => {
  res.send('Backend is running!');
 });

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});