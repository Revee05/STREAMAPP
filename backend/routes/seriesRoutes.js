const express = require("express");
const { getSeriesByGenre, getSeriesById, getAllSeries } = require("../controllers/ContentController/series");
const router = express.Router();

router.get("/byGenre", getSeriesByGenre);
router.get("/:id", getSeriesById);
router.get("/Series/all", getAllSeries);

module.exports = router;
