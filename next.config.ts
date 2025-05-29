/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export',
distDir: 'out',
images: {
unoptimized: true,
},
basePath: '/wine-stories-next',
};

export default nextConfig;
