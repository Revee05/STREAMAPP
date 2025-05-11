const express = require("express");
const { getTrendingSeries, getTrendingFilms } = require("../controllers/ContentController/trending"); // Import the trending function
const authMiddleware = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/roleCheck");
const router = express.Router();

router.get("/Series", getTrendingSeries); // Public route
router.get("/Film", getTrendingFilms); // Public route

// Admin routes for managing trending content (if any)
// Example:
// router.post("/Film", authMiddleware, checkRole(["admin"]), addTrendingFilm);

module.exports = router;


// /api/trending/Series
// /api/trending/Film