import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.myserver.com",
        pathname: "/uploads/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:path*', // ให้เข้าถึงหน้าอื่นตามปกติ
        destination: '/:path*',
      },
    ];
  },
  // experimental: {
  //   middleware: true, // เพิ่ม middleware นี้
  //   middlewareRewrites: true, // เปิดใช้งาน middleware rewrites
  // },
};

export default nextConfig;
