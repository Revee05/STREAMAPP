const pool = require("../../config/db");

const getSeriesByGenre = async (req, res) => {
  const { genreId, page = 1, limit = 18 } = req.query; // Default limit to 18
  try {
    if (!genreId) {
      return res.status(400).json({ error: "genreId query parameter is required" });
    }

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Fetch series by genre from series_genres table
    const result = await pool.query(
      `SELECT s.* 
             FROM series s
             JOIN series_genres sg ON s.id = sg.series_id
             WHERE sg.genre_id = $1
             ORDER BY s.release_year DESC NULLS LAST, 
                      s.release_month DESC NULLS LAST, 
                      s.release_day DESC NULLS LAST
             LIMIT $2 OFFSET $3`,
      [genreId, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching series by genre:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSeriesById = async (req, res) => {
  const { id } = req.params; // Get the series ID from the request parameters
  console.log(`Fetching series with ID: ${id}`); // Debug log for checking ID

  if (isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ error: "Invalid series ID" });
  }
  try {
    // Fetch series based on ID
    const seriesResult = await pool.query(
      "SELECT * FROM series WHERE id = $1",
      [id]
    );
    console.log(`Series result: ${JSON.stringify(seriesResult.rows)}`); // Debug log for checking series result

    if (seriesResult.rows.length === 0) {
      return res.status(404).json({ error: "Series not found" });
    }

    // Fetch genre of the series from the series_genres table
    const genresResult = await pool.query(
      `SELECT g.name 
             FROM genres g
             JOIN series_genres sg ON g.id = sg.genre_id
             WHERE sg.series_id = $1`,
      [id]
    );
    console.log(`Genres result: ${JSON.stringify(genresResult.rows)}`); // Debug log for checking genres result

    // Get average rating
    const ratingResult = await pool.query(
      `SELECT 
                COALESCE(TO_CHAR(ROUND(AVG(rating), 1), 'FM999.0'), '-.-') AS average_rating 
             FROM ratings 
             WHERE series_id = $1`,
      [id]
    );

    // Format result as JSON
    const series = seriesResult.rows[0];
    series.genres = genresResult.rows.map((row) => row.name);
    series.averageRating = ratingResult.rows[0].average_rating;

    res.json(series);
  } catch (error) {
    console.error("Error fetching series details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// New function to get all series
const getAllSeries = async (req, res) => {
  console.log("Fetching all series with pagination...");

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;

  try {
    const totalCountResult = await pool.query("SELECT COUNT(*) FROM series");
    const totalCount = parseInt(totalCountResult.rows[0].count);

    const result = await pool.query(
      `SELECT * FROM series 
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
    console.error("Error fetching series with pagination:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const getSeriesRatings = async (req, res) => {
//     const { id } = req.params; // Ambil ID film dari request parameter

//     if (isNaN(id) || parseInt(id) <= 0) {
//         return res.status(400).json({ error: "Invalid series ID" });
//     }

//     try {
//         // Query untuk menghitung rata-rata rating film dengan pembulatan 1 desimal
//         const ratingResult = await pool.query(
//             `SELECT
//                 COALESCE(TO_CHAR(ROUND(AVG(rating), 1), 'FM999.0'), '-.-') AS average_rating
//              FROM ratings
//              WHERE series_id = $1`,
//             [id]
//         );

//         res.json({ averageRating: ratingResult.rows[0].average_rating });
//     } catch (error) {
//         console.error("Error fetching film ratings:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

module.exports = { getSeriesByGenre, getSeriesById, getAllSeries }; // Updated export statement
