const pool = require("../../config/db");

const getTrendingFilms = async (req, res) => {
  try {
    // console.log("Fetching trending films based on view counts...");
    const filmsResult = await pool.query(
      "SELECT * FROM films ORDER BY views DESC LIMIT 10"
    );
    console.log("Fetched trending films:", filmsResult.rows);
    res.json({ films: filmsResult.rows });
  } catch (error) {
    console.error("Error fetching trending films:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTrendingSeries = async (req, res) => {
  try {
    // console.log("Fetching trending series based on view counts...");
    const seriesResult = await pool.query(
      "SELECT * FROM series ORDER BY views DESC LIMIT 10"
    );
    console.log("Fetched trending series:", seriesResult.rows);
    res.json({ series: seriesResult.rows });
  } catch (error) {
    console.error("Error fetching trending series:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { getTrendingFilms, getTrendingSeries };

