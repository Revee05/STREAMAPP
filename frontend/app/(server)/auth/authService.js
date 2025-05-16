export async function loginUser(credentials) {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_API;
  const response = await fetch(`${apiUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function registerUser(userData) {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_API;
  const response = await fetch(`${apiUrl}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
}