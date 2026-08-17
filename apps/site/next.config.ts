import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "../../.next",
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: [
    "@focar/content",
    "@focar/design-system",
    "@focar/ui",
  ],
  typedRoutes: true,
};

export default nextConfig;
