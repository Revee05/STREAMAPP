const express = require("express");
const { getFilmsByGenre, getFilmById, getAllFilms } = require("../controllers/ContentController/films");
const router = express.Router();

router.get("/byGenre", getFilmsByGenre);
router.get("/:id", getFilmById);
router.get("/Film/all", getAllFilms);

module.exports = router;

// /api/auth/login
// /api/auth/register
// /api/auth/refresh-token
// /api/auth/logout