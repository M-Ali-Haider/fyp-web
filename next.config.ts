import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com", "seizure-fyp-bucket.s3.amazonaws.com"],
  },
};

export default nextConfig;
