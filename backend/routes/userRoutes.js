const express = require("express");
const { submitRating } = require("../controllers/userController");
// const { submitRating, addComment, likeContent, dislikeContent, getUserProfile, updateUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/roleCheck");
const router = express.Router();

// Routes accessible by authenticated users (user and admin)
router.use(authMiddleware);
router.use(checkRole(["user", "admin"]));

router.post("/submitRating", submitRating);
// router.post("/addComment", addComment);
// router.post("/like", likeContent);
// router.post("/dislike", dislikeContent);
// router.get("/profile", getUserProfile);
// router.put("/profile", updateUserProfile);

module.exports = router;
