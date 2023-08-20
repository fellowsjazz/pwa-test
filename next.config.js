/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache"); // for some reason, adding runtimeCaching makes PWAs work in prod

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withPWA(nextConfig)
