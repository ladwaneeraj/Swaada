import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH when the site is served from a
// sub-path (e.g. GitHub Pages project site: /Swaada).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export — the whole site is prerendered into ./out,
  // deployable to GitHub Pages or any static host.
  output: "export",
  basePath,
  images: {
    // No image-optimizer server in a static export; the custom
    // loader serves the pre-sized JPGs and prepends basePath.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
};

export default nextConfig;
