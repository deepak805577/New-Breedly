/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: false, // Disable Turbopack to avoid React static flag errors
  },
};

export default nextConfig;
