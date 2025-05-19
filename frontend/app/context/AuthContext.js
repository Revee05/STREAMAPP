'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkAuthStatus } from '../_lib/auth/contextService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('isLoggedIn');
      return stored === 'true';
    }
    return false;
  });
  const [loading, setLoading] = useState(true); // Optional: untuk nunggu validasi auth selesai

  useEffect(() => {
    const runCheck = async () => {
      const { isAuthenticated, userData } = await checkAuthStatus();
      setIsLoggedIn(isAuthenticated);
      setUser(userData);
      setLoading(false);
    };

    runCheck();
  }, []);

  useEffect(() => {
    // Sync localStorage on page refresh or reload
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('isLoggedIn');
      if (stored === 'true' && !isLoggedIn) {
        setIsLoggedIn(true);
      }
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
