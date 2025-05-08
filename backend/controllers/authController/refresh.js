const { generateToken, generateRefreshToken, verifyRefreshToken } = require("../../utils/jwt");

const refresh = (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        const user = verifyRefreshToken(refreshToken); // Verify the refresh token
        const newToken = generateToken(user);
        const newRefreshToken = generateRefreshToken(user); // Generate a new refresh token

        res.cookie("token", newToken, {
            httpOnly: true,
            secure: false, // Disable secure for development (http)
            sameSite: "Lax", // Use Lax for development to allow cookies in cross-site requests
            path: "/", // Make cookie available on all routes
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", newRefreshToken, { // Set new refresh token in cookies
            httpOnly: true,
            secure: false, // Disable secure for development (http)
            sameSite: "Lax", // Use Lax for development
            path: "/", // Make cookie available on all routes
            maxAge: 7 * 24 * 60 * 60 * 1000 // Set a longer expiration for refresh token
        });

        res.status(200).json({ message: "Token refreshed successfully" });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired refresh token" });
    }
};

module.exports = { refresh };
