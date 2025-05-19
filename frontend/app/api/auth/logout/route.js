import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Forward the logout request to the backend server
    const apiUrl = process.env.SERVER_API;
    const response = await fetch(`${apiUrl}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Logout successful' });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || 'Logout failed' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Logout error' }, { status: 500 });
  }
}
