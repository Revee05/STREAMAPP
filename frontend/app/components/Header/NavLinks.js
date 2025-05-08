import Link from "next/link";
import styles from "./styles.module.css";
import GenreDropdown from "./GenreDropdown";
import HistoryDropdown from "./HistoryDropdown";

export default function NavLinks({
  genreRef,
  historyRef,
  genres,
  historyList,
  showGenreDropdown,
  setShowGenreDropdown,
  showHistoryDropdown,
  setShowHistoryDropdown,
}) {
  return (
    <ul className={styles.navList}>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/MovieAndSeries/movies">Movies</Link></li>
      <li><Link href="/MovieAndSeries/series">Series</Link></li>
      <li><Link href="/MyList">MyList</Link></li>

      <li className={styles.relative} ref={genreRef}>
        <button onClick={() => setShowGenreDropdown(!showGenreDropdown)}>
          Genre {showGenreDropdown ? "▲" : "▼"}
        </button>
        {showGenreDropdown && <GenreDropdown genres={genres} />}
      </li>

      <li className={styles.relative} ref={historyRef}>
        <button onClick={() => setShowHistoryDropdown(!showHistoryDropdown)}>
          History {showHistoryDropdown ? "▲" : "▼"}
        </button>
        {showHistoryDropdown && <HistoryDropdown historyList={historyList} />}
      </li>
    </ul>
  );
}