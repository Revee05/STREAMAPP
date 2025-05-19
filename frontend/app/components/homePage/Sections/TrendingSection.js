"use client";

import SectionWrapper from "../Section/SectionWrapper";
import styles from "./TrendingSection.module.css";
import CardListHorizontal from "../../CardListHorizontal";
import { useEffect, useState } from "react";
import { slugify } from "../../../utils/slugify";

export default function TrendingSection() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrendingData = async () => {
    try {
      const [moviesRes, seriesRes] = await Promise.all([
        fetch('http://localhost:8000/api/trending/Film'),
        fetch('http://localhost:8000/api/trending/Series')
      ]);

      if (!moviesRes.ok || !seriesRes.ok) {
        throw new Error('Failed to fetch trending data');
      }

      const { films } = await moviesRes.json();
      const { series } = await seriesRes.json();

      if (!films?.length || !series?.length) {
        throw new Error('Empty data received from API');
      }

      const formattedMovies = films.map(film => ({
        id: film.id,
        title: film.title,
        year: film.release_year,
        duration: film.duration ? `${film.duration} min` : 'N/A',
        rating: film.average_rating ? `${film.average_rating}/10` : 'N/A',
        poster: film.poster_url || '/fallback.jpg',
        slug: slugify(film.title),
      }));

      const formattedSeries = series.map(seriesItem => ({
        id: seriesItem.id,
        title: seriesItem.title,
        year: seriesItem.release_year,
        duration: seriesItem.episode_duration ? `${seriesItem.episode_duration} min` : 'N/A',
        rating: seriesItem.average_rating ? `${seriesItem.average_rating}/10` : 'N/A',
        poster: seriesItem.poster_url || '/fallback.jpg',
        slug: slugify(seriesItem.title),
      }));

      setTrendingMovies(formattedMovies);
      setTrendingSeries(formattedSeries);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SectionWrapper title="Trending Movies">
        <CardListHorizontal items={trendingMovies} />
      </SectionWrapper>

      <SectionWrapper title="Trending Series">
        <CardListHorizontal items={trendingSeries} />
      </SectionWrapper>
    </>
  );
}
