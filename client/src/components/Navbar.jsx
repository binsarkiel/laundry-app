import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">EasyWash</Link>
        <div className="flex space-x-4 items-center">
          {user ? (
            <>
              <Link to="/products" className="text-white hover:text-gray-300">Products</Link>
              <Link to="/customers" className="text-white hover:text-gray-300">Customers</Link>
              <Link to="/transactions" className="text-white hover:text-gray-300">Transactions</Link>
              <button onClick={logout} className="btn btn-outline btn-primary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;