const pool = require("../config/db");

const getGenres = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM genres");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching genres:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getGenres };
