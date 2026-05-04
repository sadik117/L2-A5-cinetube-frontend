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
        hostname: "i.ibb.co", //  this for imgBB
      },
      {
        protocol: "https",
        hostname: "**.ibb.co**", // Matches i.ibb.co, i.ibb.co.com, etc.
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // this for Google Profile Pictures
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // this line for upload posters in cloudinary
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc", // this line for upload posters in cloudinary
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org", 
      },
    ],
  },

  async rewrites() {
    return [
      // {
      //   source: "/api/v1/:path*",
      //   destination: "https://cinetube-server-pink.vercel.app/api/v1/:path*",
      // },

      // Default route to localhost for development
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:5000/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
