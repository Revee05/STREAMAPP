const express = require("express");
const { submitRating } = require("../controllers/userController");
const router = express.Router();

router.post("/submitRating", submitRating); // Route to submit ratings

module.exports = router;