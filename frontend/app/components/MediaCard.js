import styles from "./styles/MediaCard.module.css";
import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MediaCard({ id, slug, title, year, duration, rating, poster }) {
  const [addedToWatchList, setAddedToWatchList] = useState(false);
  const router = useRouter();

  const toggleWatchList = (e) => {
    e.stopPropagation();
    setAddedToWatchList(!addedToWatchList);
  };

  const handleCardClick = () => {
    if (slug) {
      router.push(`/watch/${encodeURIComponent(slug)}`);
    }
  };

  return (
    <div className={styles.mediaCardContainer} onClick={handleCardClick} style={{ cursor: "pointer" }}>
      {/* Poster */}
      <div className={styles.posterWrapper} style={{ position: "relative" }}>
        <Image
          src={poster || "/fallback.jpg"}
          alt={title}
          width={200}
          height={300}
          unoptimized={true}
        />
        {/* Add to Watch List Button */}
        <button
          onClick={toggleWatchList}
          aria-label={
            addedToWatchList ? "Remove from Watch List" : "Add to Watch List"
          }
          className={`${styles.watchlistButton} ${
            addedToWatchList ? styles.active : ""
          }`}
        >
          <Heart
            size={20}
            className={styles.heartIcon}
            fill={addedToWatchList ? "#e50914" : "none"}
          />
        </button>
        {/* Badge: Duration & Rating */}
        <div className={styles.badgeContainer}>
          <div className={styles.badgeItem}>{duration || "N/A"}</div>
          <div className={styles.badgeItem}>{rating || "N/A"}</div>
        </div>
      </div>

      {/* Info */}
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardYear}>{year}</p>
      </div>
    </div>
  );
}
