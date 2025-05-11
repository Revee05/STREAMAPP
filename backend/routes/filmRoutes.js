const express = require("express");
const { getFilmsByGenre, getFilmById, getAllFilms } = require("../controllers/ContentController/films");
// const { getFilmsByGenre, getFilmById, getAllFilms, createFilm, updateFilm, deleteFilm } = require("../controllers/ContentController/films");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/roleCheck");
const router = express.Router();

router.get("/byGenre", getFilmsByGenre); // Public route
router.get("/:id", getFilmById); // Public route
router.get("/Film/all", getAllFilms); // Public route

// Admin routes for content management
// router.post("/", authMiddleware, checkRole(["admin"]), createFilm);
// router.put("/:id", authMiddleware, checkRole(["admin"]), updateFilm);
// router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteFilm);

module.exports = router;

// /api/auth/login
// /api/auth/register
// /api/auth/refresh-token
// /api/auth/logout