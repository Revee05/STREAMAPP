'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

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
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API || 'http://localhost:8000';

    const checkAuthStatus = async () => {
      try {
        // Step 1: Coba cek token utama
        const res = await fetch(`${apiUrl}/api/auth/status`, {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setIsLoggedIn(data.isAuthenticated);
          setUser(data.user || null);
        } else if (res.status === 401) {
          // Token mungkin expired → coba refresh tanpa log error
          const refresh = await fetch(`${apiUrl}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          });

          if (refresh.ok) {
            // Step 3: Refresh berhasil → coba status lagi
            const retry = await fetch(`${apiUrl}/api/auth/status`, {
              credentials: 'include',
            });

            if (retry.ok) {
              const data = await retry.json();
              setIsLoggedIn(data.isAuthenticated);
              setUser(data.user || null);
            } else {
              setIsLoggedIn(false);
              setUser(null);
            }
          } else {
            // Refresh gagal → anggap logout
            setIsLoggedIn(false);
            setUser(null);
          }
        } else {
          // Log other unexpected errors
          console.error('Auth check error:', res.status, res.statusText);
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [isLoggedIn]);

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
