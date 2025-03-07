// frontend/src/components/ProductList.jsx

import React from 'react';

function ProductList({ products, onDeleteProduct, onEditProduct }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => onEditProduct(product)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
                <button onClick={() => onDeleteProduct(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default ProductList;