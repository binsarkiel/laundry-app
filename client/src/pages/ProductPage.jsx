// frontend/src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { productService } from '../services/productService';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await productService.getAllProducts();
    if (response.success) {
      setProducts(response.data);
    } else {
      setMessage(response.message)
    }
  };

  const handleAddProduct = async (newProduct) => {

    const response = await productService.createProduct(newProduct.name, newProduct.price)

    if (response.success) {
      setProducts([...products, response.data]); //Optimistic Update, langsung update state, *sebelum* response dari server
      setMessage("Success Create Data")
    } else {
      setMessage(response.message)
    }

  };

  const handleUpdateProduct = async (updatedProduct) => {
    const response = await productService.updateProduct(updatedProduct.id, updatedProduct.name, updatedProduct.price);
    if (response.success) {
      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? response.data : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
      setMessage("Success Update Data")
    } else {
      setMessage(response.message)
    }
  };

  const handleDeleteProduct = async (productId) => {

    const response = await productService.deleteProduct(productId);

    if (response.success) {
      setProducts(products.filter((product) => product.id !== productId));
      setMessage("Success Delete Data")
    } else {
      setMessage(response.message)
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null); // Batalkan edit
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {message && <p className="text-red-500">{message}</p>}
      <ProductForm
        onAddProduct={handleAddProduct}
        editingProduct={editingProduct}
        onUpdateProduct={handleUpdateProduct}
        onCancelEdit={handleCancelEdit}
      />
      <ProductList
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
      />
    </div>
  );
}

export default ProductPage;