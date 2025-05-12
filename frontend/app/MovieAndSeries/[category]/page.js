'use client';

import React, { useState, useEffect } from "react";
import styles from "../styles/page.module.css";
import stylesGenre from "../styles/GenreSection.module.css";
import CardListHorizontal from "../../components/CardListHorizontal";
import { useParams, useRouter } from "next/navigation";
import { slugify } from "../../utils/slugify";

export default function MovieOrSeriesPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category?.toLowerCase() || "movies";

  const [genres, setGenres] = useState([]);
  const [contentByGenre, setContentByGenre] = useState({});

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_API}/api/genres`
        );
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
    async function fetchContentForGenre(genreId) {
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
        setContentByGenre((prev) => ({ ...prev, [genreId]: data }));
      } catch (error) {
        console.error("Error fetching content for genre:", error);
      }
    }

    if (genres.length > 0) {
      genres.forEach((genre) => {
        fetchContentForGenre(genre.id);
      });
    }
  }, [genres, category]);

  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
        <button className={styles.backButton} onClick={() => router.push("/")}>
          Back to Home
        </button>
        {genres.length > 0 ? (
          genres.map((genre) => (
            <div key={genre.id} className={styles.wrapper}>
              <div className={stylesGenre.genreContainer}>
                <section className={stylesGenre.genreBlock}>
                  <div className={stylesGenre.genreTitleWrapper}>
                    <h2 className={stylesGenre.genreTitle}>{genre.name}</h2>
                    <button
                      className={stylesGenre.viewAllButton}
                      onClick={() =>
                        router.push(`/genre/${slugify(genre.name)}?category=${category}`)
                      }
                    >
                      View All
                    </button>
                  </div>
                  <div className={stylesGenre.genreContentWrapper}>
                    {/* Pass items with poster and details to CardListHorizontal */}
                    <CardListHorizontal
                      items={(contentByGenre[genre.id] || []).map((item) => ({
                        id: item.id,
                        slug: slugify(item.title),
                        title: item.title || item.name || "Untitled",
                        poster: item.poster_url || "",
                        releaseYear: item.release_year || "",
                        averageRating: item.averageRating || "",
                        // Add other details as needed
                      }))}
                    />
                  </div>
                </section>
              </div>
            </div>
          ))
        ) : (
          <p>Loading genres...</p>
        )}
      </div>
    </div>
  );
}
