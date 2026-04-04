import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Keep your hero placeholders
      },
      {
        protocol: "https",
        hostname: "i.ibb.co", // Add this for imgBB
      },
      {
        protocol: "https",
        hostname: "**.ibb.co**", // Matches i.ibb.co, i.ibb.co.com, etc.
      },
    ],
  },
};

export default nextConfig;
