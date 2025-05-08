// frontend/app/page.js
"use client";
// import Header from "./components/Header";
import Header from "./components/Header/Header";
import styles from "./page.module.css";
import HeroBanner from "./components/homePage/herobanner/HeroBanner";
import NewUpdateSection from "./components/homePage/Sections/NewUpdateSection";
import TrendingSection from "./components/homePage/Sections/TrendingSection";
import MovieOrSeriesSection from "./components/homePage/Sections/MovieOrSeriesSection";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {/* Your main content here */}
        <HeroBanner />
        <NewUpdateSection />
        <TrendingSection />
        <MovieOrSeriesSection />
      </main>
    </div>
  );
}
