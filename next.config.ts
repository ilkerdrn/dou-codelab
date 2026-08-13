import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/dou-codelab" : undefined,
  assetPrefix: isGitHubPages ? "/dou-codelab/" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
