const generateUsernameSuggestions = (username) => {
    return [username + Math.floor(Math.random() * 100), username + "_" + Math.floor(Math.random() * 100), username + "2024"];
};

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
};

module.exports = { generateUsernameSuggestions, isValidEmail, isValidPassword };