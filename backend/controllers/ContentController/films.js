const pool = require("../../config/db");

//function to get all films
const getAllFilms = async (req, res) => {
  // console.log("Fetching all films");
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;

  try {
    // Get total count
    const totalCountResult = await pool.query("SELECT COUNT(*) FROM films");
    const totalCount = parseInt(totalCountResult.rows[0].count);

    // Get paginated data with correct column name (release_day instead of release_date)
    const result = await pool.query(
      `SELECT * FROM films 
             ORDER BY release_year DESC NULLS LAST, 
                      release_month DESC NULLS LAST, 
                      release_day DESC NULLS LAST 
             LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.status(200).json({
      items: result.rows,
      totalCount: totalCount,
    });
  } catch (error) {
    console.error("Error fetching films with pagination:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFilmsByGenre = async (req, res) => {
  const { genreId, page = 1, limit = 18 } = req.query; // Default limit to 18
  try {
    if (!genreId) {
      return res.status(400).json({ error: "genreId query parameter is required" });
    }

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Fetch films by genre from film_genres table
    const result = await pool.query(
      `SELECT f.* 
             FROM films f
             JOIN film_genres fg ON f.id = fg.film_id
             WHERE fg.genre_id = $1
             ORDER BY f.release_year DESC NULLS LAST, f.release_month DESC NULLS LAST, f.release_day DESC NULLS LAST
             LIMIT $2 OFFSET $3`,
      [genreId, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching films by genre:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFilmById = async (req, res) => {
  console.log("getFilmById function called"); // Log statement added
  const { id } = req.params; // Get the film ID from the request parameters

  if (isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ error: "Invalid film ID" });
  }
  try {
    // Fetch film by ID
    const filmResult = await pool.query("SELECT * FROM films WHERE id = $1", [
      id,
    ]);
    if (filmResult.rows.length === 0) {
      return res.status(404).json({ error: "Film not found" });
    }

    // Fetch film genres from film_genres table
    const genresResult = await pool.query(
      `SELECT g.name 
             FROM genres g
             JOIN film_genres fg ON g.id = fg.genre_id
             WHERE fg.film_id = $1`,
      [id]
    );

    // Get average rating
    const ratingResult = await pool.query(
      `SELECT 
                COALESCE(TO_CHAR(ROUND(AVG(rating), 1), 'FM999.0'), '-.-') AS average_rating 
             FROM ratings 
             WHERE film_id = $1`,
      [id]
    );

    // Format result as JSON
    const film = filmResult.rows[0];
    film.genres = genresResult.rows.map((row) => row.name);
    film.averageRating = ratingResult.rows[0].average_rating;

    res.json(film);
  } catch (error) {
    console.error("Error fetching film details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFilmBySlug = async (req, res) => {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: "Slug query parameter is required" });
  }

  try {
    // Fetch film by slug
    const filmResult = await pool.query("SELECT * FROM films WHERE slug = $1", [
      slug,
    ]);
    if (filmResult.rows.length === 0) {
      return res.status(404).json({ error: "Film not found" });
    }

    // Fetch film genres from film_genres table
    const filmId = filmResult.rows[0].id;
    const genresResult = await pool.query(
      `SELECT g.name 
             FROM genres g
             JOIN film_genres fg ON g.id = fg.genre_id
             WHERE fg.film_id = $1`,
      [filmId]
    );

    // Get average rating
    const ratingResult = await pool.query(
      `SELECT 
                COALESCE(TO_CHAR(ROUND(AVG(rating), 1), 'FM999.0'), '-.-') AS average_rating 
             FROM ratings 
             WHERE film_id = $1`,
      [filmId]
    );

    // Format result as JSON
    const film = filmResult.rows[0];
    film.genres = genresResult.rows.map((row) => row.name);
    film.averageRating = ratingResult.rows[0].average_rating;

    res.json(film);
  } catch (error) {
    console.error("Error fetching film details by slug:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllFilms, getFilmsByGenre, getFilmById, getFilmBySlug };
