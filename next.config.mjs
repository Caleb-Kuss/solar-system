/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "*.nasa.gov",
      },
      {
        hostname: "*.youtube.com",
      },
    ],
  },
};

export default nextConfig;
