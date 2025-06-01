/** @type {import('next').NextConfig} */
const isGithub = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github";

const basePath = isGithub ? "/wine-stories-next" : "";
const assetPrefix = isGithub ? "/wine-stories-next/" : "";

const nextConfig = {
  output: "export",
  distDir: "out",
  basePath,
  assetPrefix,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
