import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder art ships as local SVG; replace with photos
    // (jpg/webp) in public/images and these settings still apply.
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
