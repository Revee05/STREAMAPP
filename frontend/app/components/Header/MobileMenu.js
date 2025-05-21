import Link from "next/link";
import { forwardRef, useState } from "react";
import styles from "./styles.module.css";

const MobileMenu = forwardRef(function MobileMenu(
  { genres, historyList, isLoggedIn, handleLogout, onClose },
  ref
) {
  const [showMobileGenreDropdown, setShowMobileGenreDropdown] = useState(false);
  const [showMobileHistoryDropdown, setShowMobileHistoryDropdown] =
    useState(false);

  return (
    <div className={styles.mobileMenu} ref={ref}>
      <ul>
        <li>
          <Link href="/" onClick={onClose}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/MovieAndSeries/movies" onClick={onClose}>
            Movies
          </Link>
        </li>
        <li>
          <Link href="/MovieAndSeries/series" onClick={onClose}>
            Series
          </Link>
        </li>
        <li>
          <Link href="/MyList" onClick={onClose}>
            MyList
          </Link>
        </li>

        <li className={styles.relative}>
          <button onClick={() => setShowMobileGenreDropdown((prev) => !prev)}>
            Genre {showMobileGenreDropdown ? "▲" : "▼"}
          </button>
          {showMobileGenreDropdown && (
            <div className={styles.mobileGenreDropdown}>
              <ul>
                {genres.map((genre) => (
                  <li key={genre}>
                    <Link
                      href={`/genre/${genre.toLowerCase()}`}
                      onClick={() => {
                        setShowMobileGenreDropdown(false);
                        onClose();
                        window.scrollTo(0, 0);
                      }}
                    >
                      {genre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>

        <li>
          <button onClick={() => setShowMobileHistoryDropdown((prev) => !prev)}>
            History {showMobileHistoryDropdown ? "▲" : "▼"}
          </button>
          {showMobileHistoryDropdown && (
            <ul>
              {historyList.map((item, idx) => (
                <li key={idx}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </li>

        <li className={styles.searchBox}>Search</li>
        <li>
          <Link href="/profile" onClick={onClose}>
            Profile
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                onClose();
              }}
            >
              Logout
            </button>
          ) : (
            <Link href="/auth" onClick={onClose}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
});

export default MobileMenu;
