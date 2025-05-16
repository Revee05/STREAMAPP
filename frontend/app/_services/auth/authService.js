const API_URL = process.env.NEXT_PUBLIC_SERVER_API;

/**
 * Login user
 * @param {Object} credentials - User credentials
 * @param {string} credentials.identifier - Username or email
 * @param {string} credentials.password - User password
 */
export async function loginUser({ identifier, password }) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ 
      type: 'login',
      identifier, 
      password 
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
}

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 */
export async function registerUser({ username, email, password }) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'register',
      username,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
}

/**
 * Logout user
 */
export async function logoutUser() {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Logout failed');
  }

  localStorage.removeItem('isLoggedIn');
  return data;
}

/**
 * Check authentication status
 */
export async function checkAuthStatus() {
  const response = await fetch(`${API_URL}/api/auth/status`, {
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to check auth status');
  }

  return data;
}

/**
 * Refresh authentication token
 */
export async function refreshToken() {
  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to refresh token');
  }

  return data;
}