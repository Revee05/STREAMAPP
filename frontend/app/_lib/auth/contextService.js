export async function checkAuthStatus() {
  try {
    // Step 1: Coba cek token utama
    const res = await fetch('/api/auth/status', {
      credentials: 'include',
    });

    if (res.ok) {
      const data = await res.json();
      return { isAuthenticated: data.isAuthenticated, userData: data.user || null };
    } else if (res.status === 401) {
      // Token mungkin expired → coba refresh tanpa log error
      const refresh = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (refresh.ok) {
        // Step 3: Refresh berhasil → coba status lagi
        const retry = await fetch('/api/auth/status', {
          credentials: 'include',
        });

        if (retry.ok) {
          const data = await retry.json();
          return { isAuthenticated: data.isAuthenticated, userData: data.user || null };
        } else {
          return { isAuthenticated: false, userData: null };
        }
      } else {
        // Refresh gagal → anggap logout
        return { isAuthenticated: false, userData: null };
      }
    } else {
      // Log other unexpected errors
      console.error('Auth check error:', res.status, res.statusText);
      return { isAuthenticated: false, userData: null };
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return { isAuthenticated: false, userData: null };
  }
}


