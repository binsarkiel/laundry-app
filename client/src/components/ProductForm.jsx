// frontend/src/components/ProductForm.jsx

import React, { useState, useEffect } from 'react';

function ProductForm({ onAddProduct, editingProduct, onUpdateProduct, onCancelEdit }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');


    useEffect(() => {
        if (editingProduct) {
            setName(editingProduct.name);
            setPrice(editingProduct.price.toString());

        } else {
            setName('');
            setPrice('');

        }
    }, [editingProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            onUpdateProduct({ id: editingProduct.id, name, price: parseFloat(price) });
        } else {
            onAddProduct({ name, price: parseFloat(price) });
        }
        setName('');
        setPrice('');

    };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {editingProduct ? 'Update Product' : 'Add Product'}
      </button>
        {editingProduct && (
            <button type="button" onClick={onCancelEdit} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
                Cancel
            </button>
        )}
    </form>
  );
}

export default ProductForm;