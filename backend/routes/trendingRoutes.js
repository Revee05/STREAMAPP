const express = require("express");
const { getTrendingSeries, getTrendingFilms } = require("../controllers/ContentController/trending"); // Import the trending function
const router = express.Router();

router.get("/Series", getTrendingSeries); // Add route for trending series
router.get("/Film", getTrendingFilms); // Add route for trending series

module.exports = router;


// /api/trending/Series
// /api/trending/Film