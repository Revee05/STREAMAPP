'use client';
import styles from './CarouselButton.module.css';

export default function CarouselButton({ direction, onClick }) {
  return (
    <button onClick={onClick} className={`${styles.CarouselButton} ${styles[direction]}`}>
      {direction === 'next' ? '▷' : '◁'}
    </button>
  );
}
