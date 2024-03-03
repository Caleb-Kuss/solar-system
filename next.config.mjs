/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.nasa.gov"
      },
      {
        hostname: "*.youtube.com"
      }
    ]
  }
};

export default nextConfig;
