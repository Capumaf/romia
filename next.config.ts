import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/demos/*": ["./private/demos/*.html"],
  },
};

export default nextConfig;