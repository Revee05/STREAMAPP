const { getAllGenres } = require("../models/genreModel");

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
        const genres = await getAllGenres();
        res.status(200).json(genres);
    } catch (error) {
        console.error("Error fetching genres:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getGenres };
