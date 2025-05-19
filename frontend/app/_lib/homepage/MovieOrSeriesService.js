// Import slugify from utils
import { slugify } from '../../utils/slugify';

const apiUrl = process.env.SERVER_API || 'http://localhost:8000';

export async function fetchMovies(page = 1, limit = 12) {
  try {
    const response = await fetch(`${apiUrl}/api/films/Film/all?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    // Add year fallback fields and slug
    const moviesWithSlug = data.items.map(item => ({
      ...item,
      year: item.year || item.releaseYear || item.release_year || item.release_date || '',
      slug: slugify(item.title),
      poster: item.poster_url || '',
    }));
    return moviesWithSlug;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export async function fetchSeries(page = 1, limit = 12) {
  try {
    const response = await fetch(`${apiUrl}/api/series/Series/all?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch series');
    }
    const data = await response.json();
    // Add year fallback fields and slug
    const seriesWithSlug = data.items.map(item => ({
      ...item,
      year: item.year || item.releaseYear || item.release_year || item.release_date || '',
      slug: slugify(item.title),
      poster: item.poster_url || '',
    }));
    return seriesWithSlug;
  } catch (error) {
    console.error('Error fetching series:', error);
    throw error;
  }
}

