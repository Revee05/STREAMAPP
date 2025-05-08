// 'use client';
import styles from './SectionHeader.module.css';

export default function SectionHeader({ title, children }) {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionHeaderTitle}>{title}</h2>
      <div className={styles.sectionHeaderChildrenWrapper}>
        {children}
      </div>
    </div>
  );
}
