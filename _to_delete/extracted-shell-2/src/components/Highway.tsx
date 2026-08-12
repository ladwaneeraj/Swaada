"use client";

import { useLayoutEffect, useRef } from "react";
import { MapPin, Phone } from "lucide-react";
import { business } from "@/data/swaada";
import { gsap, reducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import { MagneticLink, Words } from "./ui";

/**
 * Highway-stop positioning: a dashed road line travels across
 * the screen and becomes a leaf.
 */
export default function Highway() {
  const ref = useReveal<HTMLElement>();
  const art = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const svg = art.current;
    if (!svg || reducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 78%" },
      });
      tl.fromTo(
        ".road-path",
        { strokeDasharray: "14 18", strokeDashoffset: 900 },
        { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }
      )
        .fromTo(
          ".road-leaf",
          { scale: 0, transformOrigin: "center", rotate: -40 },
          { scale: 1, rotate: 0, duration: 0.9, ease: "back.out(2.2)" },
          "-=0.5"
        )
        .fromTo(
          ".road-marker",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
    }, svg);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="overflow-hidden bg-sand py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 text-center md:px-8">
        <p className="eyebrow text-clay" data-reveal>
          NH4 · Kunduwada · Davanagere
        </p>
        <Words
          as="h2"
          text={"On the road?\nTake a greener break."}
          className="font-display mt-6 text-5xl leading-[1.05] text-forest md:text-7xl"
        />
        <p className="mx-auto mt-6 max-w-xl text-ink/60" data-reveal>
          Swaada sits right on the highway — opposite Bharat Petroleum, beside
          the Kisan Bandhu nursery. Easy to spot, easy to pull into, hard to
          leave.
        </p>

        {/* Road → leaf */}
        <svg
          ref={art}
          viewBox="0 0 900 160"
          className="mx-auto mt-12 w-full max-w-3xl"
          fill="none"
          aria-hidden
        >
          <path
            className="road-path"
            d="M10 120 C 200 120, 260 60, 430 60 S 640 110, 750 96"
            stroke="var(--color-bark)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <g className="road-marker">
            <circle cx="750" cy="96" r="5" fill="var(--color-terracotta)" />
            <text
              x="750"
              y="140"
              textAnchor="middle"
              fontSize="13"
              letterSpacing="3"
              fill="var(--color-clay)"
              fontFamily="var(--font-sans)"
              fontWeight="700"
            >
              SWAADA
            </text>
          </g>
          <g className="road-leaf" transform="translate(770 40)">
            <path
              d="M0 52 C 0 20, 26 0, 58 0 C 58 32, 32 52, 0 52 Z"
              fill="var(--color-leaf)"
            />
            <path
              d="M6 46 C 20 32, 34 20, 50 8"
              stroke="var(--color-cream)"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        </svg>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4" data-reveal>
          <MagneticLink href={business.links.directions} className="btn-forest" external arrow>
            <MapPin className="size-4" aria-hidden /> Get Directions
          </MagneticLink>
          <MagneticLink href={business.phoneHref} className="btn !border !border-forest/25 text-forest hover:bg-forest/5">
            <Phone className="size-4" aria-hidden /> {business.phone}
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
