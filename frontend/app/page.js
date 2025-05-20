// frontend/app/page.js
"use client";
// import Header from "./components/Header";
import Header from "./components/Header/Header";
import styles from "./page.module.css";
import HeroBanner from "./components/homePage/herobanner/HeroBanner";
import NewUpdateSection from "./components/homePage/Sections/NewUpdateSection";
import TrendingSection from "./components/homePage/Sections/TrendingSection";
import MovieOrSeriesSection from "./components/homePage/Sections/MovieOrSeriesSection";
import AnimasiSection from "./components/homePage/Sections/AnimasiSection";
import Ads from "./components/homePage/Sections/ads/Ads";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {/* Your main content here */}
        <HeroBanner />
        <NewUpdateSection />
        <Ads />
        <TrendingSection />
        <MovieOrSeriesSection />
        <AnimasiSection />
      </main>
    </div>
  );
}
