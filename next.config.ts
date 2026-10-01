import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Keep the repo limited to the home screen; skip generated agent rule files.
  agentRules: false,
};

export default nextConfig;
