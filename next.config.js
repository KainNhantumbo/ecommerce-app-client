/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  optimizeFonts: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  images: {
    domains: ['https://res.cloudinary.com/']
  }
};

module.exports = nextConfig;
