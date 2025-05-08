import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SectionWrapper from "../Section/SectionWrapper";
import ViewAllButton from "../../Buttons/ViewButtons";
import styles from './MovieOrSeriesSection.module.css';
import CardListHorizontal from "../../CardListHorizontal";
import { slugify } from "../../../utils/slugify";

export default function MovieOrSeriesSection() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingSeries, setLoadingSeries] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_API || 'http://localhost:8000';

    const fetchMovies = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/films/Film/all?page=1&limit=12`);
        if (response.ok) {
          const data = await response.json();
          // Add year fallback fields and slug
          const moviesWithSlug = data.items.map(item => ({
            ...item,
            year: item.year || item.releaseYear || item.release_year || item.release_date || '',
            slug: slugify(item.title),
            poster: item.poster_url || '',
          }));
          setMovies(moviesWithSlug);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoadingMovies(false);
      }
    };

    const fetchSeries = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/series/Series/all?page=1&limit=12`);
        if (response.ok) {
          const data = await response.json();
          // Add year fallback fields and slug
          const seriesWithSlug = data.items.map(item => ({
            ...item,
            year: item.year || item.releaseYear || item.release_year || item.release_date || '',
            slug: slugify(item.title),
            poster: item.poster_url || '',
          }));
          setSeries(seriesWithSlug);
        } else {
          console.error("Failed to fetch series");
        }
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        setLoadingSeries(false);
      }
    };

    fetchMovies();
    fetchSeries();
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
