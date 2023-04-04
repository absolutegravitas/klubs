/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    nextScriptWorkers: true,
    newNextLinkBehavior: false,
    // images: { allowFutureImage: true },
  },
  images: {
    domains: [
      'dummyimage.com',
      'klubs.azureedge.net',
      'images.unsplash.com',
      'klubs.azurewebsites.net',
      'klubs.fly.dev',
      'lh3.googleusercontent.com', // for google user profiles
    ],
  },
})

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
