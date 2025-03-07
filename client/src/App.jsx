import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CustomerPage from './pages/CustomerPage';
import TransactionPage from './pages/TransactionPage';
import TransactionDetailPage from './pages/TransactionDetailPage';

function App() {
  return (
    <AuthProvider>
       <div className="App min-h-screen flex flex-col">
          <Navbar />
          <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
            <Route path="/customers" element={<PrivateRoute><CustomerPage /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><TransactionPage /></PrivateRoute>} />
            <Route path="/transactions/:customerName" element={<PrivateRoute><TransactionDetailPage /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </div>
        </div>
    </AuthProvider>
  );
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <p>Loading...</p>;
  }
  return user ? children : <Navigate to="/login" replace />;
}

export default App;