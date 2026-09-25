import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress responses for faster delivery
  compress: true,

  experimental: {
    scrollRestoration: true,
    // Optimized package imports to reduce client-side JS bundle
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "recharts",
      "@sanity/client",
    ],
  },

  // Minimal client-side JS: only render what is needed
  reactStrictMode: true,

  images: {
    // Serve modern WebP/AVIF formats automatically
    formats: ["image/avif", "image/webp"],
    // Only generate the sizes we actually use, reducing storage and bandwidth
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
    qualities: [75, 85],
    // Cache images for 30 days on the CDN
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  // Aggressive HTTP caching headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        // Cache static assets (fonts, images) for 1 year
        source: "/(.*)\\.(ico|jpg|jpeg|png|gif|svg|webp|avif|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
