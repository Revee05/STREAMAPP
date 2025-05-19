"use client";

import { useParams } from "next/navigation";
import Header from "../../components/Header/Header";
import styles from "./WatchPage.module.css";
import { useState, useEffect } from "react";

export default function WatchPage() {
  const params = useParams();
  const { slug } = params;

  const [contentType, setContentType] = useState(null); // 'movie' or 'series'
  const [contentData, setContentData] = useState(null);
  const [titleYear, setTitleYear] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        let apiUrl = "";
        // Try fetching from films endpoint first
        apiUrl = `${
          process.env.SERVER_API
        }/api/films/bySlug?slug=${encodeURIComponent(slug)}`;
        let response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setContentData(data);
          setContentType("movie");
          // Fetch detailed data by id for title and year
          const detailResponse = await fetch(
            `${process.env.SERVER_API}/api/films/${data.id}`
          );
          if (detailResponse.ok) {
            const detailData = await detailResponse.json();
            setTitleYear(`${detailData.title} (${detailData.release_year})`); 
          }
          return;
        }
        // If not found in films, try series endpoint
        apiUrl = `${
          process.env.SERVER_API
        }/api/series/bySlug?slug=${encodeURIComponent(slug)}`;
        response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setContentData(data);
          setContentType("series");
          // Fetch detailed data by id for title and year
          const detailResponse = await fetch(
            `${process.env.SERVER_API}/api/series/${data.id}`
          );
          if (detailResponse.ok) {
            const detailData = await detailResponse.json();
            setTitleYear(`${detailData.title} (${detailData.release_year})`);
          }
          return;
        }
        throw new Error("Content not found");
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    }
    if (slug) {
      fetchContent();
    }
  }, [slug]);

  // Dummy data for seasons and episodes if series
  const seasons = [1, 2];
  const episodesPerSeason = 12;

  // State to track which seasons are expanded
  const [expandedSeasons, setExpandedSeasons] = useState([]); // array of season numbers

  const toggleSeason = (season) => {
    if (expandedSeasons.includes(season)) {
      setExpandedSeasons(expandedSeasons.filter((s) => s !== season));
    } else {
      setExpandedSeasons([...expandedSeasons, season]);
    }
  };

  // Generate episodes array
  const episodes = Array.from({ length: episodesPerSeason }, (_, i) => i + 1);

  // State for like and dislike counts and user interaction
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null); // 'like' or 'dislike' or null

  const handleLike = () => {
    if (userReaction === "like") {
      setLikes(likes - 1);
      setUserReaction(null);
    } else {
      setLikes(userReaction === "dislike" ? likes + 1 : likes + 1);
      if (userReaction === "dislike") setDislikes(dislikes - 1);
      setUserReaction("like");
    }
  };

  const handleDislike = () => {
    if (userReaction === "dislike") {
      setDislikes(dislikes - 1);
      setUserReaction(null);
    } else {
      setDislikes(userReaction === "like" ? dislikes + 1 : dislikes + 1);
      if (userReaction === "like") setLikes(likes - 1);
      setUserReaction("dislike");
    }
  };

  // State for interactive rating stars
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    // TODO: Optionally send rating to backend here
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <Header />
      {/* Ads Section */}
      <div className={styles.adsSection}>
        <span className="text-gray-500">Ads Section</span>
      </div>

      {/* Main Content Grid */}
      <div className={styles.mainGrid}>
        {/* Left Column - Video and Details */}
        <div className={styles.videoColumn}>
          <div className={styles.videoPlayer}>Video Player</div>
          <div className={styles.videoTitle}>
            <span>{titleYear ? titleYear : "Loading title..."}</span>
            {/* Interactive Rating Stars */} 
            <div
              className={styles.ratingStarsContainer}
              role="radiogroup"
              aria-label="Rating"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  role="radio"
                  tabIndex={0}
                  aria-checked={rating === star}
                  onClick={() => handleRating(star)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleRating(star);
                    }
                  }}
                  className={styles.star}
                  style={{
                    color: (hoverRating || rating) >= star ? "#ffb400" : "#ccc",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            {/* Like and Dislike Buttons styled like YouTube */}
            <button
              onClick={handleLike}
              aria-pressed={userReaction === "like"}
              className={styles.likeButton}
              aria-label="Like"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill={userReaction === "like" ? "#e50914" : "#e5e5e5"}
              >
                <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v9c0 1.1.9 2 2 2h7c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z" />
              </svg>
              <span style={{ marginLeft: "0.25rem" }}>{likes}</span>
            </button>
            <button
              onClick={handleDislike}
              aria-pressed={userReaction === "dislike"}
              className={styles.dislikeButton}
              aria-label="Dislike"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill={userReaction === "dislike" ? "#e50914" : "#e5e5e5"}
              >
                <path d="M15 3H8c-.83 0-1.54.5-1.84 1.22L3.14 10.27c-.09.23-.14.47-.14.73v1c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 22l6.59-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2z" />
              </svg>
              <span style={{ marginLeft: "0.25rem" }}>{dislikes}</span>
            </button>
          </div>
          {contentType === "series" ? (
            <div className={styles.seasonSelector}>
              {seasons.map((season) => (
                <div key={season} className={styles.seasonItem}>
                  <div
                    className={styles.seasonHeader}
                    onClick={() => toggleSeason(season)}
                    aria-expanded={expandedSeasons.includes(season)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        toggleSeason(season);
                      }
                    }}
                  >
                    Season {season}
                  </div>
                  {expandedSeasons.includes(season) && (
                    <ul className={styles.episodeList}>
                      {episodes.map((episode) => (
                        <li key={episode} className={styles.episodeItem}>
                          Episode {episode}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : contentType === "movie" ? (
            <div className={styles.movieDetails}>
              <h3>Movie Details</h3>
              <p>
                {contentData
                  ? contentData.description
                  : "Loading description..."}
              </p>
              {/* Add more movie-specific UI here */}
            </div>
          ) : (
            <p>Loading content...</p>
          )}

          <div className={styles.detailInfo}>
            <h2 className={styles.detailTitle}>Detail Information</h2>
            <p className={styles.detailText}>
              {contentData ? contentData.description : "Loading description..."}
            </p>
          </div>
        </div>

        {/* Right Column - Comments and Ads */}
        <div className={styles.commentColumn}>
          <div className={styles.comments}>
            <h3 className="font-semibold mb-2">Komen Section</h3>
            <div className="text-sm text-gray-600">
              Comments will appear here
            </div>
          </div>

          <div className={styles.sideAds}>
            <span className="text-gray-500">Ads Section</span>
          </div>
        </div>
      </div>
    </div>
  );
}
