const {
  checkFilmExists,
  checkSeriesExists,
  insertOrUpdateFilmRating,
  insertOrUpdateSeriesRating,
} = require("../models/userModel");

const submitRating = async (req, res) => {
  const { userId, filmId, seriesId, rating } = req.body;

  // Validasi input
  if (
    !rating ||
    (filmId && seriesId) ||
    (!filmId && !seriesId) ||
    rating < 2 ||
    rating > 10 ||
    rating % 2 !== 0
  ) {
    return res
      .status(400)
      .json({ error: "Invalid input. Rating must be 2, 4, 6, 8, or 10." });
  }

  try {
    if (filmId) {
      // Cek apakah film ada
      const filmExists = await checkFilmExists(filmId);
      if (!filmExists) {
        return res.status(404).json({ error: "Film not found" });
      }

      // Insert atau update rating untuk film
      await insertOrUpdateFilmRating(userId, filmId, rating);
    } else if (seriesId) {
      // Cek apakah series ada
      const seriesExists = await checkSeriesExists(seriesId);
      if (!seriesExists) {
        return res.status(404).json({ error: "Series not found" });
      }

      // Insert atau update rating untuk series
      await insertOrUpdateSeriesRating(userId, seriesId, rating);
    }

    res.status(200).json({ message: "Rating submitted successfully" });
  } catch (error) {
    console.error("Error submitting rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { submitRating };