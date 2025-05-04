/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "/api/:path*" // In production, use relative path (will be handled by middleware or API routes)
            : "http://localhost:8000/api/:path*", // In development, proxy to local backend
      },
      {
        source: "/recommendations/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "/api/recommendations/:path*" // In production, use relative path
            : "http://localhost:8001/api/recommendations/:path*", // In development, proxy to local backend
      },
    ]
  },
}

module.exports = nextConfig
