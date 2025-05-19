/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_API: process.env.SERVER_API
  },
  reactStrictMode: false,
  images: {
    domains: [
      "i.pravatar.cc",
      "via.placeholder.com",
      "www.themoviedb.org",
      "4kwallpapers.com",
      "image.tmdb.org",
      "example.com",
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.SERVER_API },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
};

export default nextConfig;
