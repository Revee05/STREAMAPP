"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MediaCard from "../../components/MediaCard";
import styles from "./GenrePage.module.css";

const ITEMS_PER_PAGE = 24;

export default function GenrePage() {
  const params = useParams();
  const router = useRouter();
  const genre = params.genre;

  // Get category from URL search params manually
  const [category, setCategory] = useState("movies");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const cat = urlParams.get("category");
      if (cat === "movies" || cat === "series") {
        setCategory(cat);
      }
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/api/genres`);
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetchContentByGenre(genreId) {
      try {
        const apiUrl =
          category === "movies"
            ? `${process.env.NEXT_PUBLIC_SERVER_API}/api/films/byGenre?genreId=${genreId}`
            : `${process.env.NEXT_PUBLIC_SERVER_API}/api/series/byGenre?genreId=${genreId}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch content for genre");
        }
        const data = await response.json();
        setItems(data);
        setCurrentPage(1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching content for genre:", error);
        setLoading(false);
      }
    }

    if (genres.length > 0 && genre) {
      const matchedGenre = genres.find((g) => g.name.toLowerCase() === genre.toLowerCase());
      if (matchedGenre) {
        fetchContentByGenre(matchedGenre.id);
      } else {
        setItems([]);
        setLoading(false);
      }
    }
  }, [genres, genre, category]);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  if (!genre) return <div>Genre not specified</div>;
  if (loading) return <div>Loading...</div>;

  // Adjust genre display name based on category
  const displayGenreName =
    category === "movies" ? `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies` :
    category === "series" ? `${genre.charAt(0).toUpperCase() + genre.slice(1)} Series` :
    genre.charAt(0).toUpperCase() + genre.slice(1);

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>{displayGenreName}</h1>
      {/* <button
        onClick={() => window.location.href = '/'}
        className={styles.button}
        style={{ marginBottom: '1rem' }}
      >
        Back to Home
      </button> */}
      <div className={styles.grid}>
        {currentItems.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/watch/${item.id}`)}
            style={{ cursor: "pointer" }}
          >
            <MediaCard
              title={item.title || item.name}
              year={item.release_year || item.year}
              poster={item.poster_url || item.poster}
              rating={item.averageRating || item.rating}
              duration={item.duration || ""}
            />
          </div>
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
  );
}
