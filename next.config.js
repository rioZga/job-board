/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "a0k90asxiyud018s.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
