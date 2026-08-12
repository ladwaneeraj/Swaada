"use client";

import Image from "next/image";
import { business, instaGrid } from "@/data/swaada";
import { useReveal } from "@/lib/useReveal";
import { Eyebrow, MagneticLink, Words } from "./ui";

function InstaGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

export default function InstagramSection() {
  const ref = useReveal<HTMLElement>();
  const href = business.links.instagram;

  return (
    <section ref={ref} className="bg-offwhite pb-28 md:pb-36">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>On the feed</Eyebrow>
            <Words
              as="h2"
              text="See what's growing at Swaada."
              className="font-display text-4xl text-forest md:text-6xl"
            />
          </div>
          <MagneticLink
            href={href ?? business.links.maps}
            className="btn-forest"
            external
            ariaLabel={href ? "Follow Swaada on Instagram" : "See Swaada photos on Google"}
          >
            <InstaGlyph className="size-4" />
            {href ? "Follow Swaada" : "See more photos"}
          </MagneticLink>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {instaGrid.map((item, i) => (
            <div
              key={item.image}
              className="img-frame aspect-square rounded-lg"
              data-reveal
              data-delay={`${i * 0.05}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 16vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
