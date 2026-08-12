"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "@/data/swaada";
import { useReveal } from "@/lib/useReveal";
import { Eyebrow, Words } from "./ui";

export default function Gallery() {
  const ref = useReveal<HTMLElement>();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenIdx((i) =>
        i === null ? i : (i + dir + gallery.length) % gallery.length
      ),
    []
  );

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx, step]);

  return (
    <section ref={ref} id="gallery" className="bg-offwhite py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Eyebrow>Gallery</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Words
            as="h2"
            text="Moments under the leaves."
            className="font-display text-5xl text-forest md:text-6xl"
          />
          <p className="max-w-xs text-sm text-ink/55" data-reveal>
            Café corners, plates, plants and evenings at Swaada.
          </p>
        </div>

        <div className="mt-14 columns-2 gap-4 md:columns-3 [&>button]:mb-4">
          {gallery.map((g, i) => (
            <button
              key={g.image}
              onClick={() => setOpenIdx(i)}
              className="img-frame group relative block w-full overflow-hidden rounded-xl"
              data-reveal
              data-delay={`${(i % 3) * 0.07}`}
              aria-label={`Open photo: ${g.alt}`}
            >
              <Image
                src={g.image}
                alt={g.alt}
                width={800}
                height={g.tall ? 1120 : 600}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full object-cover"
              />
              <span className="absolute inset-0 bg-forest-deep/0 transition-colors duration-500 group-hover:bg-forest-deep/45" />
              <span className="absolute bottom-4 left-4 translate-y-3 text-xs font-bold uppercase tracking-[0.24em] text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {g.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-forest-deep/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setOpenIdx(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button
            className="absolute right-5 top-5 text-cream/80 hover:text-cream"
            aria-label="Close"
            onClick={() => setOpenIdx(null)}
          >
            <X className="size-8" />
          </button>
          <button
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 text-cream/70 hover:text-cream md:block"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <ChevronLeft className="size-10" />
          </button>
          <figure
            className="max-h-[86svh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery[openIdx].image}
              alt={gallery[openIdx].alt}
              width={1400}
              height={1050}
              sizes="90vw"
              className="max-h-[78svh] w-auto rounded-lg object-contain"
              priority
            />
            <figcaption className="mt-4 text-center text-sm tracking-wide text-cream/70">
              {gallery[openIdx].category} — {openIdx + 1} / {gallery.length}
            </figcaption>
          </figure>
          <button
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 text-cream/70 hover:text-cream md:block"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <ChevronRight className="size-10" />
          </button>
        </div>
      )}
    </section>
  );
}
