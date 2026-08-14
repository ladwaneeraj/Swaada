/**
 * Custom next/image loader for the static export. Images are
 * pre-sized by scripts/fetch-images.mjs, so no resizing here —
 * we only prepend the base path (e.g. /Swaada on GitHub Pages),
 * which next/image does NOT do automatically for string srcs.
 */
export default function imageLoader({ src }: { src: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
