import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // For static export (GitHub Pages), uncomment:
  // output: 'export',
  // trailingSlash: true,
};

export default nextConfig;
