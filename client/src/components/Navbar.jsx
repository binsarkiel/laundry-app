import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link dan useLocation
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { Menu, X, WashingMachine as Washing } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth(); // Dapatkan user dan fungsi logout
  const location = useLocation();     // Dapatkan lokasi saat ini
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk mobile menu

  const isHomePage = location.pathname === '/';  // Cek apakah di HomePage

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Gunakan Link untuk menuju ke home */}
            <Link to="/" className="flex items-center">
              <Washing className="h-8 w-8 text-blue-500" /> {/*Ganti text-primary*/}
              <span className="ml-2 text-xl font-bold text-gray-900">LaundryPro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Menu untuk Landing Page (HANYA jika belum login dan di HomePage) */}
            {isHomePage && !user && (
                <>
                    <a href="#services" className="text-gray-600 hover:text-blue-500">Services</a>
                    <a href="#how-it-works" className="text-gray-600 hover:text-blue-500">How it Works</a>
                    <a href="#pricing" className="text-gray-600 hover:text-blue-500">Contact</a>
                    {/* Gunakan Link untuk ke halaman register */}
                    <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</Link>
                </>
            )}

            {/* Menu untuk User yang Sudah Login */}
            {user && (
                <>
                    <Link to="/products" className="text-gray-600 hover:text-blue-500">Products</Link>
                    <Link to="/customers" className="text-gray-600 hover:text-blue-500">Customers</Link>
                    <Link to="/transactions" className="text-gray-600 hover:text-blue-500">Transactions</Link>
                    <span className="text-gray-600">Welcome, {user.username} ({user.role})</span>
                    <button onClick={logout}  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Logout</button>
                </>
            )}

            {/* Jika belum login dan tidak di home, tampilkan "Get Started" */}
            {!user && !isHomePage && (
               <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-500 z-50 relative"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Navigation */}
      <div
        className={`
        fixed inset-0 bg-white/80 backdrop-blur-lg transform
        ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        transition-all duration-300 ease-in-out md:hidden
      `}
      >
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            {/* Menu untuk Landing Page (HANYA jika belum login dan di HomePage) */}
            {isHomePage && !user && (
                <>
                <a
                    href="#services"
                    className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transform hover:scale-110 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Services
                </a>
                <a
                    href="#how-it-works"
                    className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transform hover:scale-110 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                >
                    How it Works
                </a>
                <a
                    href="#pricing"
                    className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transform hover:scale-110 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Pricing
                </a>
                {/* Gunakan Link untuk ke halaman register */}
                <Link
                    to="/register"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Get Started
                </Link>
                </>
            )}

            {/* Menu untuk User yang Sudah Login */}
            {user && (
                <>
                {/* Gunakan Link untuk navigasi internal */}
                <Link
                    to="/products"
                    className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transform hover:scale-110 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Products
                </Link>
                <Link
                    to="/customers"
                    className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transform hover:scale-110 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Customers
                </Link>
                <Link
                    to="/transactions"
                    className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transform hover:scale-110 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Transactions
                </Link>
                <button
                    onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
                </>
             )}
            {/*Jika belum Login dan tidak di HomePage, tampilkan tombol "Get Started" */}
            {!user && !isHomePage && (
                <Link
                    to="/register"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsMenuOpen(false)}
                    >
                        Get Started
                </Link>
            )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;