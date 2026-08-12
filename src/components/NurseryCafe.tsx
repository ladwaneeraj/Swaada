"use client";

import { useLayoutEffect, useRef } from "react";
import { images } from "@/data/swaada";
import { gsap, reducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import { Eyebrow, Frame, Words } from "./ui";
import { GrowingCorner } from "./Botanical";

export default function NurseryCafe() {
  const ref = useReveal<HTMLElement>();
  const grow = useRef<HTMLDivElement>(null);

  // Leaves "grow" in around the content as it enters the viewport
  useLayoutEffect(() => {
    const el = grow.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<SVGSVGElement>("svg").forEach((svg) => {
        const vine = svg.querySelector(".grow-vine");
        const leaves = svg.querySelectorAll(".grow-leaf");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 75%" },
        });
        if (vine)
          tl.fromTo(
            vine,
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }
          );
        tl.fromTo(
          leaves,
          { scale: 0, transformOrigin: "0 0" },
          { scale: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.09 },
          0.5
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="green"
      className="relative overflow-hidden bg-forest py-28 text-cream md:py-40"
    >
      <div ref={grow} aria-hidden>
        <GrowingCorner className="absolute -left-6 bottom-0 w-44 text-sage/70 md:w-64" />
        <GrowingCorner flip className="absolute -right-6 top-8 w-40 text-moss md:w-56" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-3xl">
          <Eyebrow tone="text-gold">Nursery × Café</Eyebrow>
          <Words
            as="h2"
            text={"Where every table has\na little green around it."}
            className="font-display text-5xl leading-[1.04] md:text-7xl"
          />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/70" data-reveal>
            Swaada sits beside a working plant nursery — so the foliage
            around you isn&apos;t décor, it&apos;s alive and growing. Pots,
            fronds and young trees frame the seating, indoors and out.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-8" data-reveal>
            <Frame
              src={images.nursery}
              alt="Rows of nursery plants in terracotta pots beside the café seating at Swaada"
              className="aspect-[16/9] shadow-2xl shadow-forest-deep/50"
              sizes="(max-width: 768px) 100vw, 62vw"
              rounded="rounded-3xl"
            />
          </div>
          <ul className="flex flex-col justify-center gap-8 md:col-span-4">
            {[
              ["Living surroundings", "Seating woven between real nursery plants, not plastic ones."],
              ["Indoors & open air", "Shaded corners, open sky and everything in between."],
              ["Take green home", "The nursery next door grows plants you can walk out with."],
            ].map(([title, text]) => (
              <li key={title} className="border-l border-gold/40 pl-5" data-reveal>
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/60">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
