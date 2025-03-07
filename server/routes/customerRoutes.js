const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authController = require('../controllers/authController');

router.post('/', authController.authenticateToken, authController.authorizeRole(['admin','kasir']), customerController.createCustomer);
router.get('/', authController.authenticateToken, authController.authorizeRole(['admin','kasir']), customerController.getAllCustomers);
router.get('/:id', authController.authenticateToken, authController.authorizeRole(['admin', 'kasir']), customerController.getCustomerById);
router.put('/:id', authController.authenticateToken, authController.authorizeRole(['admin', 'kasir']), customerController.updateCustomer);
router.delete('/:id', authController.authenticateToken, authController.authorizeRole(['admin']), customerController.deleteCustomer);

module.exports = router;