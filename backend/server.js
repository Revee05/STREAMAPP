const express = require('express');
const cors = require('cors'); // Import CORS
const pool = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const genreRoutes = require('./routes/genreRoutes'); // Import genre routes
const filmRoutes = require('./routes/filmRoutes'); // Import film routes
const trendingRoutes = require("./routes/trendingRoutes"); // Import trending routes
const seriesRoutes = require('./routes/seriesRoutes'); // Import series routes
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes

const app = express();
dotenv.config();
app.use(cors({
  origin: process.env.FRONTEND_URL, // Allow requests from this origin
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
})); // Use CORS middleware

app.use(cookieParser());
app.use(express.json());

// Check database connection
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database Connected: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Database Error');
  }
});

// Execute routes
app.use("/api/auth", authRoutes);
app.use('/api/genres', genreRoutes); // Use genre routes
app.use('/api/trending', trendingRoutes); // Use trending routes
app.use('/api/films', filmRoutes); // Use film routes
app.use('/api/series', seriesRoutes); // Use series routes
app.use('/api/user', userRoutes); // user routes
app.use('/api/admin', adminRoutes); // admin routes

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
