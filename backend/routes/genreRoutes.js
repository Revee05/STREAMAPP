const express = require("express");
const { getGenres } = require("../controllers/genreController");
// const { getGenres, createGenre, updateGenre, deleteGenre } = require("../controllers/genreController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/roleCheck");

const router = express.Router();

router.get("/", getGenres); // Public route

// Admin routes for genre management
// router.post("/", authMiddleware, checkRole(["admin"]), createGenre);
// router.put("/:id", authMiddleware, checkRole(["admin"]), updateGenre);
// router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteGenre);

module.exports = router;
