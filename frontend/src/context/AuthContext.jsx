import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

const STORAGE_KEY = 'bkig_demo_session';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      // Restore non-sensitive demo session if present
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser]);

  /**
   * Authoritative login via OTP verification.
   * Role is determined STRICTLY by user record, never user interface override.
   */
  const login = async (mobile, otp) => {
    setLoading(true);
    try {
      const { user } = await authService.verifyOtp(mobile, otp);
      setCurrentUser(user);
      return { success: true, user };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fast Demo Login for reviewers & testing
   */
  const demoLogin = async (role) => {
    setLoading(true);
    try {
      const { user } = await authService.demoQuickLogin(role);
      setCurrentUser(user);
      return { success: true, user };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log out and wipe session
   */
  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    role: currentUser?.role || null,
    loading,
    login,
    demoLogin,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
