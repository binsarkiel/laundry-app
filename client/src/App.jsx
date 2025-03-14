import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import TransactionPage from "./pages/TransactionPage";
import TransactionDetailPage from "./pages/TransactionDetailPage";
import DashboardPage from "./pages/DashboardPage"
import Layout from "./components/Layout";

function App() {

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route
              path="/login"
              element={
                <Layout showNavbar={false}>
                  <LoginPage />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout showNavbar={false}>
                  <RegisterPage />
                </Layout>
              }
            />
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout>
                    <DashboardPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Layout>
                    <ProductPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <PrivateRoute>
                  <Layout>
                    <CustomerPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <PrivateRoute>
                  <Layout>
                    <TransactionPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/transactions/:customerName"
              element={
                <PrivateRoute>
                  <Layout>
                    <TransactionDetailPage />
                  </Layout>
                </PrivateRoute>
              }
            />
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
