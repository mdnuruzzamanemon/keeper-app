import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // TODO: Implement actual API call
    try {
      // Temporary mock login
      setIsAuthenticated(true);
      setUser({ email });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const signup = async (email, password, name) => {
    // TODO: Implement actual API call
    try {
      // Temporary mock signup
      setIsAuthenticated(true);
      setUser({ email, name });
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup }}>
      {children}
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