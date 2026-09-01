/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/join",
        destination: "/join-membership",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;