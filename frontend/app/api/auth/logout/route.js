import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const apiUrl = process.env.SERVER_API;

    // Kirim permintaan logout ke server backend
    const response = await fetch(`${apiUrl}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    // Siapkan response baru dari Next.js
    const logout = NextResponse.json({ message: 'Logout successful' });

    if (response.ok) {
      // Hapus cookie auth token (nama cookie sesuaikan dengan yang kamu pakai)
      logout.cookies.set('token', '', { maxAge: 0 });
      logout.cookies.set('refreshToken', '', { maxAge: 0 });

      // Jika kamu tahu nama cookie lain yang digunakan auth, tambahkan di sini
      return logout;
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Logout failed' },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: 'Logout error' }, { status: 500 });
  }
}
