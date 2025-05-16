'use client';
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import styles from './auth.module.css';
import { useAuth } from '../../_lib/auth/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { setIsLoggedIn } = useAuth();

  return (
    <div className={styles.auth}>
      <div className={styles.formContainer}>
        {isLogin ? (
          <LoginForm
            onSwitch={() => setIsLogin(false)}
            onLoginSuccess={() => setIsLoggedIn(true)}
          />
        ) : (
          <RegisterForm onSwitch={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}
