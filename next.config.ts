import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  output: "standalone",
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
      {
        hostname: "celpipmaster.com",
      },
      {
        hostname: "assets.celpipbro.com",
      },
      {
        hostname: "assets.tcfgo.com",
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
        destination: "/resources/listening/by-suite",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
