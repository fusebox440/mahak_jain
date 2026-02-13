/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/mahak_jain',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

module.exports = nextConfig
