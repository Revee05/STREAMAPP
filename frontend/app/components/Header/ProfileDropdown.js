'use client';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import styles from './styles.module.css';
import { useRouter } from 'next/navigation';

export default function ProfileDropdown() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.SERVER_API || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsLoggedIn(false);
        router.push('/auth');
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
