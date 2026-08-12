import type { NextConfig } from "next";

// Set BASE_PATH when the site is served from a sub-path
// (e.g. GitHub Pages project site: BASE_PATH=/Swaada).
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export — the whole site is prerendered into ./out,
  // deployable to GitHub Pages or any static host.
  output: "export",
  basePath,
  images: {
    // The static export has no image-optimizer server; images are
    // already sized/compressed by scripts/fetch-images.mjs.
    unoptimized: true,
  },
};

export default nextConfig;
