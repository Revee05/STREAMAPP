'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SectionWrapper from "../Section/SectionWrapper";
import ViewAllButton from "../../Buttons/ViewButtons";
import styles from './MovieOrSeriesSection.module.css';
import CardListHorizontal from "../../CardListHorizontal";
import { fetchMovies, fetchSeries } from "../../../_lib/homepage/MovieOrSeriesService";

export default function MovieOrSeriesSection() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingSeries, setLoadingSeries] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies(1, 12);
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoadingMovies(false);
      }
    };

    const loadSeries = async () => {
      try {
        const seriesData = await fetchSeries(1, 12);
        setSeries(seriesData);
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        setLoadingSeries(false);
      }
    };

    loadMovies();
    loadSeries();
  }, []);

  return (
    <>
      <SectionWrapper
        title="Movies"
        actions={
          <div className={styles.actionsWrapper}>
            <ViewAllButton className={styles.buttonSmall} onClick={() => router.push('/Media/films')} />
          </div>
        }
      >
        {loadingMovies ? <div>Loading movies...</div> : <CardListHorizontal items={movies} />}
      </SectionWrapper>

      <SectionWrapper
        title="Series"
        actions={
          <div className={styles.actionsWrapper}>
            <ViewAllButton className={styles.buttonSmall} onClick={() => router.push('/Media/series')} />
          </div>
        }
      >
        {loadingSeries ? <div>Loading series...</div> : <CardListHorizontal items={series} />}
      </SectionWrapper>
    </>
  );
}
