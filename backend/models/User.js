const pool = require("../config/db");

const createUser = async (username, email, passwordHash, role = "user") => {
    const query = `INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [username, email, passwordHash, role];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getUserByEmailOrUsername = async (identifier) => {
    const query = `SELECT * FROM users WHERE email = $1 OR username = $1`;
    const result = await pool.query(query, [identifier]);
    return result.rows[0];
};

module.exports = { createUser, getUserByEmailOrUsername };