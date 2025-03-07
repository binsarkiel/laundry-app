import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { transactionService } from '../services/transactionService';
import { customerService } from '../services/customerService';
import { productService } from '../services/productService'; // Import productService
import TransactionForm from '../components/TransactionForm';

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]); // State untuk menyimpan daftar produk

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const transactionResponse = await transactionService.getAllTransactions();
        const customerResponse = await customerService.getAllCustomers();
        const productResponse = await productService.getAllProducts(); // Ambil daftar produk


        if (transactionResponse.success && customerResponse.success && productResponse.success) {
          setTransactions(transactionResponse.data);
          setCustomers(customerResponse.data);
          setProducts(productResponse.data); // Simpan daftar produk

        } else {
          setError(transactionResponse.message || customerResponse.message || productResponse.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTransactionClick = () => {
    setShowForm(true);
  };
  const handleTransactionCreated = () => {
    // Refresh daftar transaksi dan customer
    setShowForm(false);
    Promise.all([
      transactionService.getAllTransactions(),
      customerService.getAllCustomers()
    ]).then(([transactionRes, customerRes]) => {
        if(transactionRes.success && customerRes.success){
          setTransactions(transactionRes.data);
          setCustomers(customerRes.data)
        }else{
          setError(transactionRes.message || customerRes.message)
        }
    }).catch(err => {
        setError(err.message)
    })
  };

    const handleCancel = () => {
        setShowForm(false)
    }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transaction List</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <button onClick={handleAddTransactionClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
        Add Transaction
      </button>

      {showForm && (
          <TransactionForm
            customerData={customers}
            productData={products} // Kirim daftar produk ke form
            onTransactionCreated={handleTransactionCreated}
            onCancel={handleCancel}
          />
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
           <table className='min-w-full divide-y divide-gray-200'>
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Transactions</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {customers.map((customer) => {
                            // Filter transaksi berdasarkan customer_id
                            const customerTransactions = transactions.filter(t => t.customer_id === customer.id);
                            const totalTransactions = customerTransactions.length;

                            // Hanya tampilkan customer yang memiliki transaksi
                            if (totalTransactions > 0) {
                                return (
                                    <tr key={customer.id}>
                                         <td className="px-6 py-4 whitespace-nowrap">{customer.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{totalTransactions}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link to={`/transactions/${customer.name}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2'>
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            }
                            return null; // Jangan tampilkan jika tidak ada transaksi
                        })}
                    </tbody>
                </table>
        </div>
      )}
    </div>
  );
}

export default TransactionPage;