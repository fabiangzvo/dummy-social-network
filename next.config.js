/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.dummyapi.io",
      },
    ],
  },
};

module.exports = nextConfig;
