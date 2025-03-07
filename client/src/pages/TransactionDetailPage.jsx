import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { transactionService } from '../services/transactionService';
import TransactionDetail from '../components/TransactionDetail';
import { customerService } from '../services/customerService'; // Import customerService

function TransactionDetailPage() {
  const { customerName } = useParams(); // Ambil customerName dari URL
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customer, setCustomer] = useState(null); // State untuk menyimpan data customer


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Cari customer berdasarkan nama (dari URL)
        const customerResponse = await customerService.getAllCustomers(); // Ambil semua customer
        if(customerResponse.success){
          const foundCustomer = customerResponse.data.find(c => c.name === customerName);

          if (foundCustomer) {
            setCustomer(foundCustomer); // Set data customer

            // 2. Ambil SEMUA detail transaksi untuk customer tersebut
            const transactionResponse = await transactionService.getTransactionsByCustomerId(foundCustomer.id); //get transaction by customer id.
            if (transactionResponse.success) {
              // transactionDetails berisi SEMUA detail transaksi (termasuk product, qty, subtotal)
              setTransactionDetails(transactionResponse.data);
            } else {
              setError(transactionResponse.message);
            }
          } else {
            setError('Customer not found');
          }

        }


      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerName]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Transaction History for {customer ? customer.name : 'Loading...'}
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        // Kirim transactionDetails (yang berisi SEMUA detail) ke TransactionDetail
        <TransactionDetail transactionDetails={transactionDetails} isDetail={true} />
      )}
    </div>
  );
}

export default TransactionDetailPage;