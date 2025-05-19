'use server'
import { slugify } from '../../utils/slugify';

const apiUrl = process.env.SERVER_API || 'http://localhost:8000';

async function fetchTrendingFilmsData() {
  try {
    const response = await fetch(`${apiUrl}/api/trending/Film`);
    if (!response.ok) {
      throw new Error('Failed to fetch trending films');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching trending films:', error);
    throw error;
  }
}

async function fetchTrendingSeriesData() {
  try {
    const response = await fetch(`${apiUrl}/api/trending/Series`);
    if (!response.ok) {
      throw new Error('Failed to fetch trending series');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching trending series:', error);
    throw error;
  }
}

export async function fetchTrendingFilms() {
  const data = await fetchTrendingFilmsData();
  if (!data || !data.films) {
    return [];
  }
  const filmsWithSlug = data.films
    .map(film => ({
      ...film,
      year: film.release_year || '',
      duration: film.duration ? `${film.duration} min` : 'N/A',
      rating: film.average_rating ? `${film.average_rating}/10` : 'N/A',
      poster: film.poster_url || '/fallback.jpg',
      slug: slugify(film.title),
    }))
    .sort((a, b) => (b.views || 0) - (a.views || 0));
  return filmsWithSlug;
}

export async function fetchTrendingSeries() {
  const data = await fetchTrendingSeriesData();
  if (!data || !data.series) {
    return [];
  }
  const seriesWithSlug = data.series
    .map(seriesItem => ({
      ...seriesItem,
      year: seriesItem.release_year || '',
      duration: seriesItem.episode_duration ? `${seriesItem.episode_duration} min` : 'N/A',
      rating: seriesItem.average_rating ? `${seriesItem.average_rating}/10` : 'N/A',
      poster: seriesItem.poster_url || '/fallback.jpg',
      slug: slugify(seriesItem.title),
    }))
    .sort((a, b) => (b.views || 0) - (a.views || 0));
  return seriesWithSlug;
}
