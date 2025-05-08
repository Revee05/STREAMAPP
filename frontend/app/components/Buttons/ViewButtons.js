'use client';
import styles from './ViewAllButton.module.css';

export default function ViewAllButton({ onClick }) {
  return (
    <button onClick={onClick} className={styles.ViewAllButton}>
      View All
    </button>
  );
}
