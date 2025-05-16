const { getUserByEmailOrUsername } = require("../../models/userModel");
const { comparePassword } = require("../../utils/hashPassword");
const { generateToken, generateRefreshToken } = require("../../utils/jwt");

const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({ message: "Username/Email and password are required" });
        }

        const user = await getUserByEmailOrUsername(identifier);
        if (!user) {
            return res.status(400).json({ message: "Invalid username/email or password" });
        }

        const isPasswordValid = await comparePassword(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username/email or password" });
        }

        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Disable secure for development (http)
            sameSite: "Lax", // Use Lax for development to allow cookies in cross-site requests
            path: "/", // Make cookie available on all routes
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // Disable secure for development (http)
            sameSite: "Lax", // Use Lax for development
            path: "/", // Make cookie available on all routes
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successful", user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { login };
