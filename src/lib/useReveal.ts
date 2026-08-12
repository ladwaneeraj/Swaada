"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "./gsap";

/**
 * Registers scroll-triggered animations for everything inside `scope`:
 *  - [data-reveal]        → fade + rise (optional data-delay)
 *  - [data-reveal-word]   → word-by-word line reveal (pre-split spans)
 *  - [data-parallax="n"]  → vertical parallax, n = strength (-1..1)
 * Call inside an active gsap.context().
 */
export function setupReveals(scope: HTMLElement) {
  const all = <T extends Element>(sel: string) =>
    Array.from(scope.querySelectorAll<T>(sel));

  all<HTMLElement>("[data-reveal]").forEach((node) => {
    gsap.to(node, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power3.out",
      delay: Number(node.dataset.delay ?? 0),
      scrollTrigger: { trigger: node, start: "top 86%" },
    });
  });

  all<HTMLElement>("[data-reveal-word]").forEach((node) => {
    gsap.to(node.querySelectorAll(".rw > span"), {
      y: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.055,
      scrollTrigger: { trigger: node, start: "top 85%" },
    });
  });

  all<HTMLElement>("[data-parallax]").forEach((node) => {
    const strength = parseFloat(node.dataset.parallax ?? "0.15");
    gsap.fromTo(
      node,
      { y: () => strength * 120 },
      {
        y: () => strength * -120,
        ease: "none",
        scrollTrigger: {
          trigger: node.parentElement ?? node,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}

/** Attach the reveal set to a section root. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => setupReveals(el), el);
    return () => ctx.revert();
  }, []);

  return ref;
}
