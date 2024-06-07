import path from 'path';
import dotenv from 'dotenv-webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React's Strict Mode
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add environment variables using dotenv
    config.plugins.push(new dotenv({ path: path.join(process.cwd(), '.env.local'), systemvars: true }));

    // Add custom webpack configuration
    config.resolve.alias['@'] = path.resolve(process.cwd());
    
    return config;
  },
  // Enable usage of environment variables in the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  // Custom directory for the Next.js server
  distDir: 'build'
};

export default nextConfig;
