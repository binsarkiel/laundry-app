import React, { useState } from 'react';
import { transactionService } from '../services/transactionService';
import { v4 as uuidv4 } from 'uuid';

function TransactionForm({ customerData, productData, onTransactionCreated, onCancel }) {
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalAmount, setTotalAmount] = useState(''); // Total Bayar (otomatis)
  const [transactionCode, setTransactionCode] = useState(uuidv4()); // Auto-generate
  const [errors, setErrors] = useState({});

  const handleCustomerChange = (event) => {
    setCustomerId(event.target.value);
    setErrors({...errors, customer: null}); //Hapus error ketika value berubah
  };

  const handleProductChange = (event) => {
    setProductId(event.target.value);
     setErrors({...errors, product: null});
    calculateTotalAmount(event.target.value, quantity); // Hitung total saat produk berubah

  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    setErrors({...errors, quantity: null});
    calculateTotalAmount(productId, event.target.value); // Hitung total saat quantity berubah
  };

  const calculateTotalAmount = (selectedProductId, enteredQuantity) => {
    if (selectedProductId && enteredQuantity) {
      const product = productData.find((p) => p.id === parseInt(selectedProductId, 10));
      if (product) {
        setTotalAmount((product.price * parseFloat(enteredQuantity)).toFixed(2)); // Format 2 angka desimal
      }
    } else {
      setTotalAmount(''); // Reset total jika produk atau quantity kosong
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validasi
    const newErrors = {};
    if (!customerId) {
      newErrors.customer = 'Please select a customer.';
    }
    if (!productId) {
      newErrors.product = 'Please select a product.';
    }
    if (!quantity || parseFloat(quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Buat objek data transaksi
    const transactionData = {
      customer_id: parseInt(customerId, 10), // Pastikan integer
      products: [
        {
          product_id: parseInt(productId, 10), // Pastikan integer
          quantity: parseFloat(quantity),    // Pastikan float
        },
      ],
    };

    try {
      const response = await transactionService.createTransaction(transactionData);
      if (response.success) {
        onTransactionCreated(); // Panggil callback
        // Reset form
        setCustomerId('');
        setProductId('');
        setQuantity('');
        setTotalAmount('');
        setTransactionCode(uuidv4()); // Generate UUID baru untuk transaksi berikutnya
        setErrors({});
      } else {
        setErrors({ submit: response.message });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred while creating the transaction.' });
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-lg font-bold mb-4">Add Transaction</h2>
      {errors.submit && <p className='text-red-500 text-sm mb-4'>{errors.submit}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionCode">
            Transaction Code
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="transactionCode"
            type="text"
            value={transactionCode}
            readOnly // Read-only, tidak bisa diedit
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer">
            Customer
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="customer"
            value={customerId}
            onChange={handleCustomerChange}
          >
            <option value="">Select Customer</option>
            {customerData.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          {errors.customer && <p className='text-red-500 text-xs italic'>{errors.customer}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
            Product
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product"
            value={productId}
            onChange={handleProductChange}
          >
            <option value="">Select Product</option>
            {productData.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
            {errors.product && <p className='text-red-500 text-xs italic'>{errors.product}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity (Kg)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
            {errors.quantity && <p className='text-red-500 text-xs italic'>{errors.quantity}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Total Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={totalAmount}
            readOnly // Read-only
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Transaction
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Cancel
           </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;