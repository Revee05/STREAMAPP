'use client';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/_lib/auth/authService';

export default function ProfileDropdown() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        setIsLoggedIn(false);
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
