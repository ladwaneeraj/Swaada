/**
 * Custom next/image loader for the static export: serves the
 * files as-is and prepends the base path (e.g. /Swaada on GitHub
 * Pages), which next/image does NOT do automatically for string
 * srcs.
 */
export default function imageLoader({ src }: { src: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
