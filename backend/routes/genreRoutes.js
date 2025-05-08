const express = require("express");
const { getGenres } = require("../controllers/genreController");

const router = express.Router();

router.get("/", getGenres); // Route to get all genres

module.exports = router;
