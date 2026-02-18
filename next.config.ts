import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash (mock data images)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Airtable CDN (production shoe images)
      {
        protocol: 'https',
        hostname: '*.airtableusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'dl.airtable.com',
      },
    ],
  },
};

export default nextConfig;
