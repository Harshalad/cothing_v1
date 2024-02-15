/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  compiler: {
    emotion: true,
    // removeConsole: true, 
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
