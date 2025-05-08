const pool = require("../config/db");

const submitRating = async (req, res) => {
    const { userId, filmId, seriesId, rating } = req.body;

    // Validasi input
    if (!rating || (filmId && seriesId) || (!filmId && !seriesId) || rating < 2 || rating > 10 || rating % 2 !== 0) {
        return res.status(400).json({ error: "Invalid input. Rating must be 2, 4, 6, 8, or 10." });
    }

    try {
        if (filmId) {
            // Cek apakah film ada
            const filmCheck = await pool.query("SELECT id FROM films WHERE id = $1", [filmId]);
            if (filmCheck.rows.length === 0) {
                return res.status(404).json({ error: "Film not found" });
            }

            // Insert atau update rating untuk film
            await pool.query(
                `INSERT INTO ratings (user_id, film_id, rating)
                 VALUES ($1, $2, $3)
                 ON CONFLICT (user_id, film_id) 
                 DO UPDATE SET rating = EXCLUDED.rating`,
                [userId, filmId, rating]
            );
        } else if (seriesId) {
            // Cek apakah series ada
            const seriesCheck = await pool.query("SELECT id FROM series WHERE id = $1", [seriesId]);
            if (seriesCheck.rows.length === 0) {
                return res.status(404).json({ error: "Series not found" });
            }

            // Insert atau update rating untuk series
            await pool.query(
                `INSERT INTO ratings (user_id, series_id, rating)
                 VALUES ($1, $2, $3)
                 ON CONFLICT (user_id, series_id) 
                 DO UPDATE SET rating = EXCLUDED.rating`,
                [userId, seriesId, rating]
            );
        }

        res.status(200).json({ message: "Rating submitted successfully" });
    } catch (error) {
        console.error("Error submitting rating:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { submitRating };