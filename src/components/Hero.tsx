"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { business, images } from "@/data/swaada";
import { gsap, reducedMotion } from "@/lib/gsap";
import { MagneticLink } from "./ui";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;

    const ctx = gsap.context(() => {
      // Page-load: title rises, veil fades
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(".hero-veil", { opacity: 0, duration: 1.2, ease: "power2.inOut" })
        .fromTo(
          ".hero-line",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.25, stagger: 0.12 },
          0.25
        )
        .fromTo(
          ".hero-fade",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.9
        );

      // Scroll: slow zoom, layered parallax, light shift, text lift
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.to(".hero-bg", { scale: 1.14, yPercent: 8, ease: "none" }, 0)
        .to(".hero-light", { opacity: 0.15, xPercent: -12, ease: "none" }, 0)
        .to(".hero-copy", { yPercent: -36, opacity: 0.1, ease: "none" }, 0);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-forest-deep text-cream"
    >
      {/* Background image (slow zoom) */}
      <div className="hero-bg absolute inset-0 will-change-transform">
        <Image
          src={images.hero}
          alt="Swaada café seating surrounded by dense green plants and warm sunlight, Davanagere"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/55 via-forest-deep/25 to-forest-deep/75" />
      </div>

      {/* Sunlight sweep */}
      <div
        className="hero-light pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 74% 18%, rgba(217,164,65,0.5), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Bottom vignette for depth */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-forest-deep/70 to-transparent"
        aria-hidden
      />

      {/* Copy */}
      <div className="hero-copy relative z-10 px-6 text-center">
        <p className="hero-fade eyebrow text-gold">
          Nursery · Café · NH4 Davanagere
        </p>
        <h1
          className="font-display mt-6 text-[clamp(4.2rem,16vw,11.5rem)] leading-[0.95] tracking-[0.08em]"
          aria-label="SWĀDA"
        >
          <span className="block overflow-clip">
            <span className="hero-line block">SWĀDA</span>
          </span>
        </h1>
        <div className="overflow-clip">
          <p className="hero-line font-display mt-4 text-2xl italic text-sage-light md:text-4xl">
            A little taste of nature.
          </p>
        </div>
        <p className="hero-fade mx-auto mt-6 max-w-md text-sm leading-relaxed text-cream/75 md:text-base">
          {business.subline}
        </p>
        <div className="hero-fade mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticLink href="#story" className="btn-solid" arrow>
            Explore Swaada
          </MagneticLink>
          <MagneticLink
            href={business.links.directions}
            className="btn-outline"
            external
            ariaLabel="Get directions to Swaada on Google Maps"
          >
            <MapPin className="size-4" aria-hidden />
            Get Directions
          </MagneticLink>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-fade absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="text-[0.65rem] font-semibold tracking-[0.34em] text-cream/60">
          SCROLL TO EXPLORE
        </p>
        <div className="mx-auto mt-2 h-9 w-px overflow-hidden bg-cream/20">
          <div className="h-3 w-px animate-bounce bg-gold" />
        </div>
      </div>

      {/* Load veil */}
      <div className="hero-veil pointer-events-none absolute inset-0 z-20 bg-forest-deep" />
    </section>
  );
}
