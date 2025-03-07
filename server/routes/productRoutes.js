const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

router.post('/', authController.authenticateToken, authController.authorizeRole(['admin']), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authController.authenticateToken, authController.authorizeRole(['admin']), productController.updateProduct);
router.delete('/:id', authController.authenticateToken, authController.authorizeRole(['admin']), productController.deleteProduct);


module.exports = router;