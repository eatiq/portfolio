import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-5bb086b3946849a39897e875fa7e5fd9.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-b3b956d5ced14f8dbb0fff5838bcb4cc.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
