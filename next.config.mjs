/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ======================================================
     External Images
  ====================================================== */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;