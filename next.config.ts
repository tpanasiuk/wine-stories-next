/** @type {import('next').NextConfig} */
const isGithub = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github";

const nextConfig = {
  ...(isGithub && {
    output: "export",
    distDir: "out",
    basePath: "/wine-stories-next",
    assetPrefix: "/wine-stories-next/",
    images: {
      unoptimized: true,
    },
  }),
};

export default nextConfig;
