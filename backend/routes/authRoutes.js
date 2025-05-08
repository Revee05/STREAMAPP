const express = require("express");
const { register } = require("../controllers/authController/register");
const { login } = require("../controllers/authController/login");
const { refresh } = require("../controllers/authController/refresh");
const { logout } = require("../controllers/authController/logout");
const { authStatus } = require("../controllers/authController/status");

const router = express.Router();
router.post("/register", register); // Register route
router.post("/login", login);
router.post("/refresh", refresh); // Refresh token route
router.post("/logout", logout);
router.get("/status", authStatus);

module.exports = router;