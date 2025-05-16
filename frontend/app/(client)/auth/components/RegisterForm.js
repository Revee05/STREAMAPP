'use client';
import { useState } from 'react';
import styles from './form.module.css';
import EyeToggle from '../../../components/auth/EyeToggle';
import { registerUser } from '../../../_services/auth/authService';
import { validatePassword, validateAuthFields } from '../../../_lib/auth/validation';

export default function RegisterForm({ onSwitch }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateAuthFields({ username, email, password, confirmPassword })) {
      setError('Please fill in all fields');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must contain at least 6 characters, including uppercase, lowercase, and number');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await registerUser({ username, email, password });
      if (onSwitch) {
        onSwitch();
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        {error && <div className={styles.error}>{error}</div>}

        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <div className={styles.inputGroup}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <EyeToggle
            isVisible={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((prev) => !prev)}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>

        <div className={styles.switchText}>
          <span>Already have an account? </span>
          <br />
          <span className={styles.switchLink} onClick={onSwitch}>
            Sign in
          </span>
        </div>
      </form>
    </div>
  );
}
