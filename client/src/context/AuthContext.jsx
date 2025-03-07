// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService'; // Import authService
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.checkAuth();
        if (response.success) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
         // Redirect to login if not authenticated
        navigate('/login');

      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const login = async (username, password) => {
      const response = await authService.login(username, password);
        if(response.success){
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            navigate('/'); // Arahkan ke halaman utama setelah login
            return {success: true}
        }else{
            return {success: false, message: response.message}
        }
  };

  const register = async(username, password, role) => {
    const response = await authService.register(username, password, role);
    if(response.success){
         return { success: true };
    }else{
         return { success: false, message: response.message };
    }
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login'); // Arahkan ke halaman login setelah logout
  };

  const contextValue = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};