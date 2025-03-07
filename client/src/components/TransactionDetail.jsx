import React from 'react';

function TransactionDetail({ transactionDetails, isDetail }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction Code
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Qty (Kg)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subtotal
            </th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Selalu tampilkan detail, tidak peduli nilai isDetail */}
            {transactionDetails.map((detail) => (
              <tr key={detail.detail_id}>
                <td className="px-6 py-4 whitespace-nowrap">{detail.transaction_code}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(detail.transaction_date).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{detail.product_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{detail.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{detail.subtotal}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionDetail;