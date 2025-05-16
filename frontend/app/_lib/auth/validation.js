export function validatePassword(password) {
  // Password must be at least 6 characters long and include uppercase, lowercase, and number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(password);
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateUsername(username) {
  // Username must be at least 3 characters long and contain only letters, numbers, and underscores
  const regex = /^[a-zA-Z0-9_]{3,}$/;
  return regex.test(username);
}

export function validateAuthFields(fields) {
  return Object.values(fields).every(field => field.trim() !== '');
}