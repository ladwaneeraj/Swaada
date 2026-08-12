"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { escape as panels } from "@/data/swaada";
import { gsap, reducedMotion } from "@/lib/gsap";
import { setupReveals } from "@/lib/useReveal";
import { Eyebrow, Words } from "./ui";

/**
 * Horizontal gallery driven by vertical scroll (desktop, GSAP pin).
 * On mobile / reduced motion it falls back to a native
 * scroll-snap row — nothing confusing, no hijacking.
 */
export default function GreenEscape() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    const strip = track.current;
    if (!el || !strip || reducedMotion()) return;

    const ctx = gsap.context(() => {
      setupReveals(el);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const scroll = () => strip.scrollWidth - el.clientWidth;
        gsap.to(strip, {
          x: () => -scroll(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${scroll()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="overflow-hidden bg-forest-deep py-24 text-cream md:h-svh md:py-0">
      <div className="flex h-full flex-col md:justify-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <Eyebrow tone="text-gold">Green escape</Eyebrow>
          <Words
            as="h2"
            text="A café surrounded by green."
            className="font-display text-4xl md:text-6xl"
          />
        </div>

        <div
          ref={track}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 md:mt-14 md:snap-none md:overflow-visible md:px-8"
        >
          {panels.map((p, i) => (
            <figure
              key={p.label}
              className="img-frame group relative aspect-[3/4] w-[76vw] shrink-0 snap-center overflow-hidden rounded-2xl sm:w-[46vw] md:w-[30vw] lg:w-[24vw]"
            >
              <Image
                src={p.image}
                alt={`${p.label} at Swaada, Davanagere`}
                fill
                sizes="(max-width: 768px) 76vw, 26vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-5 left-5">
                <span className="font-display text-xs tracking-[0.28em] text-gold">
                  0{i + 1}
                </span>
                <p className="font-display mt-1 text-2xl">{p.label}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
