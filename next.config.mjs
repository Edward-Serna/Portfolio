/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow the domain in Next.js
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }
    ]
  }
};
export default nextConfig;
