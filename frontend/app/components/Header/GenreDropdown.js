import Link from "next/link";
import styles from "./styles.module.css";

export default function GenreDropdown({ genres }) {
  const splitGenresIntoColumns = (genresList, maxPerColumn = 7) => {
    const columns = [];
    for (let i = 0; i < genresList.length; i += maxPerColumn) {
      columns.push(genresList.slice(i, i + maxPerColumn));
    }
    return columns;
  };

  const genreColumns = splitGenresIntoColumns(genres);

  return (
    <div className={styles.dropdown}>
      {genreColumns.map((column, index) => (
        <ul key={index} className={styles.genreColumn}>
          {column.map((genre) => (
            <li key={genre}>
              <Link href={`/genre/${genre.toLowerCase()}`}>{genre}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}