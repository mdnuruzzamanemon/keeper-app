import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // TODO: Implement API call to get user data
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      // TODO: Set user data
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const initiateSignup = async (userData) => {
    try {
      const response = await api.post('/auth/initiate-signup', userData);
      return response.data.userId;
    } catch (error) {
      throw error.response?.data?.message || 'Signup initiation failed';
    }
  };

  const verifyOTP = async (userId, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', { userId, otp });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      // TODO: Set user data
    } catch (error) {
      throw error.response?.data?.message || 'OTP verification failed';
    }
  };

  const resendOTP = async (userId) => {
    try {
      await api.post('/auth/resend-otp', { userId });
    } catch (error) {
      throw error.response?.data?.message || 'Failed to resend OTP';
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      loading,
      login, 
      logout, 
      initiateSignup,
      verifyOTP,
      resendOTP
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 