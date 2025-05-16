export function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(password);
}

export function validateAuthFields(fields) {
  return Object.values(fields).every(field => field.trim() !== '');
}