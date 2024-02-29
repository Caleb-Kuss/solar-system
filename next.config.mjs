/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "youtube.com",
      },
    ],
  },
};

export default nextConfig;
