/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  basePath: "/wine-stories-next",
  assetPrefix: "/wine-stories-next",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
