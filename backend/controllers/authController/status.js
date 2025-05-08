const jwt = require("jsonwebtoken");

const authStatus = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ isAuthenticated: false, message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ isAuthenticated: false, message: "Invalid token" });
      }
      // Token is valid, return user info (excluding sensitive data)
      const user = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role,
      };
      return res.status(200).json({ isAuthenticated: true, user });
    });
  } catch (error) {
    return res.status(500).json({ isAuthenticated: false, message: "Server error", error: error.message });
  }
};

module.exports = { authStatus };
