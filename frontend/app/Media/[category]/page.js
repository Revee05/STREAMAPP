'use client';

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import MediaCard from "../../components/MediaCard";
import { slugify } from "../../utils/slugify";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category?.toLowerCase() || "films";

  const [mediaItems, setMediaItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMediaItems = async (category, page) => {
    setLoading(true);
    setError(null);
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER_API || "http://localhost:8000";
      const apiCategory = category === "films" ? "films" : "series";
      const apiSubPath = category === "films" ? "Film" : "Series";
      const response = await fetch(
        `${apiBaseUrl}/api/${apiCategory}/${apiSubPath}/all?page=${page}&limit=${itemsPerPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // Map poster_url to poster and ensure rating and duration fields
      const mappedItems = data.items.map(item => ({
        ...item,
        poster: item.poster_url || item.poster || item.posterPath || "/fallback.jpg",
        rating: item.rating || item.averageRating || "N/A",
        duration: item.duration || item.episodeCount || "N/A",
      }));
      setMediaItems(mappedItems);
      setTotalCount(data.totalCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when category changes
  }, [category]);

  useEffect(() => {
    fetchMediaItems(category, currentPage);
  }, [category, currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Map 'films' to 'Films' and 'series' to 'Series' for title display
  const displayTitle = category === "films" ? "Films" : capitalize(category);

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{displayTitle}</h1>
        <div className={styles.content}>
          {loading && <div>Loading {displayTitle}...</div>}
          {error && <div>Error: {error}</div>}
          {!loading && !error && (
            <>
              <ul className={styles.list}>
                {mediaItems.map((item, index) => (
                  <li key={index}>
                    <MediaCard
                      id={item.id}
                      slug={slugify(item.title)}
                      title={item.title}
                      year={item.year || item.releaseYear || item.release_year || item.release_date || ""}
                      duration={item.duration || item.episodeCount || "N/A"}
                      rating={item.rating || item.averageRating || "N/A"}
                      poster={item.poster || item.posterPath || "/fallback.jpg"}
                    />
                  </li>
                ))}
              </ul>
              <div className={styles.pagination}>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
