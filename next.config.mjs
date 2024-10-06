/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // source에 명시되어 있는 '/api/~'경로로 접근하면 destination에 명시되어있는 경로로 redirect 됨
    return [
      {
        source: "/api/:path*",
        destination: `http://192.168.0.6:8000/:path*`,
      },
    ];
  },
};

export default nextConfig;
