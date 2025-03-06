import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },

  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
      {
        hostname: "via.placeholder.com",
      },
      {
        hostname: "examens.preptcfcanada.com",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/resources/by-suit",
  //     },
  //   ];
  // },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/resources/listening/by-suit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
