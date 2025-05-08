"use client";

import { useEffect, useState } from "react";
import MediaCard from "../components/MediaCard";
import styles from "./MyList.module.css";
import Header from "../components/Header/Header";

const ITEMS_PER_PAGE = 16;

export default function MyListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Generate all item data secara deterministik hanya di sisi client
    const generatedItems = Array.from({ length: 45 }).map((_, i) => ({
      id: i + 1,
      title: `Film/Series Title ${i + 1}`,
      year: 2000 + (i % 20),
      poster: `https://via.placeholder.com/200x300?text=Poster+${i + 1}`,
      rating: (Math.random() * 5 + 5).toFixed(1),
      duration: `${90 + (i % 60)} min`,
    }));
    setItems(generatedItems);
  }, []);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  if (items.length === 0) return null; // Hindari render sebelum data siap

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <main className={styles.container}>
          <h1 className={styles.heading}>My List</h1>
          <div className={styles.grid}>
            {currentItems.map((item) => (
              <MediaCard
                key={item.id}
                title={item.title}
                year={item.year}
                poster={item.poster}
                rating={item.rating}
                duration={item.duration}
              />
            ))}
          </div>
          <div className={styles.pagination}>
            <button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className={styles.button}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className={styles.button}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
