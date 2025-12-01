import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
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
        hostname: `${process.env.PUBLIC_HOST_API}`,
        port: `${process.env.PUBLIC_PORT_API}`,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: `${process.env.PUBLIC_HOST_API}`,
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
