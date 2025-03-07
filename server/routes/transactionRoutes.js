const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authController = require('../controllers/authController');

router.post('/', authController.authenticateToken, authController.authorizeRole(['admin', 'kasir']), transactionController.createTransaction);
router.get('/', authController.authenticateToken, authController.authorizeRole(['admin', 'kasir']), transactionController.getAllTransactions);
router.get('/customer/:customer_id', authController.authenticateToken, authController.authorizeRole(['admin', 'kasir']), transactionController.getTransactionsByCustomerId);

module.exports = router;