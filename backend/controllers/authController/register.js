const { createUser, getUserByEmailOrUsername } = require("../../models/userModel");
const { hashPassword } = require("../../utils/hashPassword");
const { generateUsernameSuggestions, isValidEmail, isValidPassword } = require("../../utils/validator");


const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({ message: "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, and a number" });
        }

        const existingEmailUser = await getUserByEmailOrUsername(email);
        if (existingEmailUser) {
            return res.status(400).json({ message: "Invalid Email/Username or Password" });
        }

        const existingUsernameUser = await getUserByEmailOrUsername(username);
        if (existingUsernameUser) {
            return res.status(400).json({ 
                message: "Invalid Email/Username or Password", 
                suggestions: generateUsernameSuggestions(username) 
            });
        }

        const passwordHash = await hashPassword(password);
        const newUser = await createUser(username, email, passwordHash, "user");

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { register };
