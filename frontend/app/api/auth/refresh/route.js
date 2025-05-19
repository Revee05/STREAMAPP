import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Hardcode the correct backend API URL with port 8000
    const backendUrl = process.env.SERVER_API;
    const response = await fetch(`${backendUrl}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: data.message || 'Refresh failed' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Refresh error' }, { status: 500 });
  }
}
