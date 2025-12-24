import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // lockfile 경고 해결
  outputFileTracingRoot: require("path").join(__dirname),
};

export default nextConfig;