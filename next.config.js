/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false,
  productionBrowserSourceMaps: false,
  skipMiddlewareUrlNormalize: true,
  images: {
    remotePatterns: [{ hostname: 'https://res.cloudinary.com/' }]
  }
};

module.exports = nextConfig;
