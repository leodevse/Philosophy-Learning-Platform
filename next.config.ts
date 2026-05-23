import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cho phép truy cập dev qua IP LAN (vd. http://192.168.1.2:3000) — HMR + client JS
  allowedDevOrigins: ["192.168.*", "10.*", "172.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
