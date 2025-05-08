'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './styles/AuthWrapper.module.css'; // Import CSS Module

export default function AuthWrapper({ children }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loaderContainer} suppressHydrationWarning={true}>
        <div className={styles.loadingSpinner}></div> {/* Spinner */}
        <span>Loading...</span> {/* Optionally, you can add text */}
      </div>
    );
  }

  return <>{children}</>;
}
