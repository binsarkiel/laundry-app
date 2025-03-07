const Product = require('../models/product');

const productController = {
  createProduct: async (req, res) => {
    try {
      const { name, price } = req.body;
        if (!name || !price ) {
            return res.status(400).json({ message: 'Name, and price are required' });
        }
      const newProduct = await Product.create(name, price);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
        console.log("getAllProducts called"); // Tambahkan log ini
        const products = await Product.getAll();
        console.log("Products fetched from model:", products); // Tambahkan log ini
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error); // Pastikan ini ada
        console.error("Error stack:", error.stack); // Tambahkan log ini (PENTING)
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
},
    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findById(parseInt(id, 10));
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product', error: error.message });
        }
    },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

      const updatedProduct = await Product.update(parseInt(id, 10), name, price);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      await Product.delete(parseInt(id, 10));
      res.status(204).send(); // 204 No Content (berhasil, tapi tidak ada konten yang dikembalikan)
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  },
};

module.exports = productController;