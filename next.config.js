/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  optimizeFonts: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  skipMiddlewareUrlNormalize: true,
  images: {
    remotePatterns: [{ hostname: 'https://res.cloudinary.com/' }]
  }
};

module.exports = nextConfig;
