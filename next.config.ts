import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = isGitHubPages
  ? { output: "export", basePath: "/monkey-web", assetPrefix: "/monkey-web", trailingSlash: true, typescript: { ignoreBuildErrors: true } }
  : {};

export default nextConfig;
