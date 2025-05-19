'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './form.module.css';
import EyeToggle from '../../components/auth/EyeToggle';

export default function LoginForm({ onSwitch, onLoginSuccess }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Set login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        router.push('/'); // Redirect after login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        {error && <div className={styles.error}>{error}</div>}

        <input
          type="text"
          placeholder="Email or username"
          className={styles.input}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <div className={styles.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <EyeToggle
            isVisible={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>

        <div className={styles.switchText}>
          <span>Don&apos;t have an account? </span>
          <br />
          <span className={styles.switchLink} onClick={onSwitch}>Sign up</span>
        </div>
      </form>
    </div>
  );
}
