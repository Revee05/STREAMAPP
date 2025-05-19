"use client";

import SectionWrapper from "../Section/SectionWrapper";
import styles from "./TrendingSection.module.css";
import CardListHorizontal from "../../CardListHorizontal";
import { useEffect, useState } from "react";
import {
  fetchTrendingFilms,
  fetchTrendingSeries,
} from "../../../_lib/homepage/trendingService";

export default function TrendingSection() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrendingData = async () => {
    try {
      const [movies, series] = await Promise.all([
        fetchTrendingFilms(),
        fetchTrendingSeries(),
      ]);

      if (!movies?.length || !series?.length) {
        throw new Error("Empty data received from API");
      }

      setTrendingMovies(movies);
      setTrendingSeries(series);
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
