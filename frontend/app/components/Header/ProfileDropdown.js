'use client';
import Link from 'next/link';
import styles from './styles.module.css';

export default function ProfileDropdown({ isLoggedIn, handleLogout }) {
  return (
    <ul className={styles.profileDropdown}>
      {isLoggedIn ? (
        <>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      ) : (
        <li>
          <Link href="/auth">Login</Link>
        </li>
      )}
    </ul>
  );
}
