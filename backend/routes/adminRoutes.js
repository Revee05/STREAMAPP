const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleCheck');
const { uploadMedia } = require('../controllers/adminController/upload');

// Admin upload route protected by auth and admin role check
router.post('/upload', authMiddleware, checkRole(['admin']), uploadMedia);

module.exports = router;
