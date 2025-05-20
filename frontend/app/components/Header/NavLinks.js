import Link from "next/link";
import styles from "./styles.module.css";
import GenreDropdown from "./GenreDropdown";
import HistoryDropdown from "./HistoryDropdown";

export default function NavLinks({
  genreRef,
  historyRef,
  genres,
  historyList,
  activeDropdown,
  setActiveDropdown,
}) {
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <ul className={styles.navList}>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/MovieAndSeries/movies">Movies</Link></li>
      <li><Link href="/MovieAndSeries/series">Series</Link></li>
      <li><Link href="/MyList">MyList</Link></li>

      <li className={styles.relative} ref={genreRef}>
        <button onClick={() => toggleDropdown('genre')}>
          Genre {activeDropdown === 'genre' ? "▲" : "▼"}
        </button>
        {activeDropdown === 'genre' && <GenreDropdown genres={genres} />}
      </li>

      <li className={styles.relative} ref={historyRef}>
        <button onClick={() => toggleDropdown('history')}>
          History {activeDropdown === 'history' ? "▲" : "▼"}
        </button>
        {activeDropdown === 'history' && <HistoryDropdown historyList={historyList} />}
      </li>
    </ul>
  );
}
