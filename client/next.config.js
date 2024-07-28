/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   env: {
      NEXT_PUBLIC_SERVER_HOST: process.env.NEXT_PUBLIC_SERVER_HOST,
      NEXT_PUBLIC_ZEGO_APP_ID: process.env.NEXT_PUBLIC_ZEGO_APP_ID,
      NEXT_PUBLIC_ZEGO_SERVER_SECRET: process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET,
   },
   images: {
      domains: ["localhost", process.env.NEXT_PUBLIC_SERVER_HOST?.split("://")[1]],
   },
};

module.exports = nextConfig;
