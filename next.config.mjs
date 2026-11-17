/** @type {import('next').NextConfig} */
const nextConfig = {
  // The ID card PDF reads these at runtime with fs; make sure they ship
  // inside the serverless functions that render it.
  outputFileTracingIncludes: {
    "/api/member/**": [
      "./pdf/fonts/**/*",
      "./public/images/ailp-emblem.png",
      "./public/images/party-president-signature.png",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
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