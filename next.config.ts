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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Add this for Google Profile Pictures
      },
    ],
  },
};

export default nextConfig;
