/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: { ignoreBuildErrors: true },
  outputFileTracingExcludes: { "/api/docs": ["./.next/cache/**/*"] },
};

export default nextConfig;
