/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/the-measure',
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = nextConfig;
