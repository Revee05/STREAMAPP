const pool = require("../config/db");

/**
 * GET /genres
 * Controller untuk mengambil semua genre dari tabel 'genres'.
 *
 * @param {Object} req - Objek request dari Express.
 * @param {Object} res - Objek response dari Express.
 * @returns {void} Mengembalikan response JSON berisi daftar genre atau error.
 *
 * Response:
 *  - 200 OK: Berhasil mengambil genre, response berupa array JSON.
 *  - 500 Internal Server Error: Jika terjadi kesalahan saat query ke database.
 */
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
