import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "images.pexels.com"],
    qualities: [75, 100],
  },
};

export default nextConfig;
