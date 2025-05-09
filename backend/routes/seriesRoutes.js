const express = require("express");
const { getSeriesByGenre, getSeriesById, getAllSeries } = require("../controllers/ContentController/series");
// const { getSeriesByGenre, getSeriesById, getAllSeries, createSeries, updateSeries, deleteSeries } = require("../controllers/ContentController/series");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/roleCheck");
const router = express.Router();

router.get("/byGenre", getSeriesByGenre); // Public route
router.get("/:id", getSeriesById); // Public route
router.get("/Series/all", getAllSeries); // Public route

// Admin routes for series management
// router.post("/", authMiddleware, checkRole(["admin"]), createSeries);
// router.put("/:id", authMiddleware, checkRole(["admin"]), updateSeries);
// router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteSeries);

module.exports = router;
