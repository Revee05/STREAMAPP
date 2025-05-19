"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import loadingStyles from "./loadingSpinner.module.css";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";
import { Menu, X } from "lucide-react";
import useClickOutside from "./useClickOutside";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn, loading: authLoading } = useAuth();
  const router = useRouter();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const mobileMenuRef = useRef(null);
  const genreRef = useRef(null);
  const historyRef = useRef(null);
  const profileRef = useRef(null);

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];

  const historyList = [
    "List 1",
    "List 2",
    "List 3",
    "List 4",
    "List 5",
    "List 6",
    "List 7",
    "List 8",
    "List 9",
    "List 10",
  ];

  useClickOutside([genreRef], () => setShowGenreDropdown(false));
  useClickOutside([historyRef], () => setShowHistoryDropdown(false));
  useClickOutside([profileRef], () => setShowProfileDropdown(false));
  useClickOutside([mobileMenuRef], () => {
    setShowMobileMenu(false);
    document.body.style.overflow = "auto";
  });

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events?.on("routeChangeStart", handleStart);
    router.events?.on("routeChangeComplete", handleComplete);
    router.events?.on("routeChangeError", handleComplete);

    return () => {
      router.events?.off("routeChangeStart", handleStart);
      router.events?.off("routeChangeComplete", handleComplete);
      router.events?.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.SERVER_API;
      const response = await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false);
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu((prev) => {
      const state = !prev;
      document.body.style.overflow = state ? "hidden" : "auto";
      return state;
    });
  };

  if (authLoading || loading) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/">STREAMAPP</Link>
          </div>
          <div className={loadingStyles.loadingSpinner} title="Loading..."></div>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">STREAMAP</Link>
        </div>

        <button className={styles.hamburger} onClick={handleMobileMenuToggle}>
          {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={styles.nav}>
          <NavLinks
            genreRef={genreRef}
            historyRef={historyRef}
            genres={genres}
            historyList={historyList}
            showGenreDropdown={showGenreDropdown}
            setShowGenreDropdown={setShowGenreDropdown}
            showHistoryDropdown={showHistoryDropdown}
            setShowHistoryDropdown={setShowHistoryDropdown}
          />
        </nav>

        <div className={styles.actions}>
          <div className={styles.searchBox}>Search</div>
          <div className={styles.profile} ref={profileRef}>
            <button onClick={() => setShowProfileDropdown((prev) => !prev)}>
              <Image
                src="https://i.pravatar.cc/150?img=3"
                alt="Profile"
                width={40}
                height={40}
                className={styles.avatar}
              />
            </button>
            {showProfileDropdown && (
              <ProfileDropdown
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <MobileMenu
          ref={mobileMenuRef}
          genres={genres}
          historyList={historyList}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          onClose={() => {
            setShowMobileMenu(false);
            document.body.style.overflow = "auto";
          }}
        />
      )}
    </header>
  );
}
