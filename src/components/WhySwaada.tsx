"use client";

import { Coffee, Leaf, Sun, UtensilsCrossed } from "lucide-react";
import { pillars } from "@/data/swaada";
import { useReveal } from "@/lib/useReveal";
import { Eyebrow, Words } from "./ui";

const icons = {
  plate: UtensilsCrossed,
  coffee: Coffee,
  leaf: Leaf,
  sun: Sun,
} as const;

export default function WhySwaada() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-offwhite py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Eyebrow>Why people stop here</Eyebrow>
        <Words
          as="h2"
          text="Four good reasons."
          className="font-display text-5xl text-forest md:text-6xl"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-forest/10 bg-forest/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = icons[p.icon as keyof typeof icons];
            return (
              <article
                key={p.title}
                className="group bg-offwhite p-9 transition-colors duration-500 hover:bg-forest"
                data-reveal
                data-delay={`${i * 0.08}`}
              >
                <Icon
                  className="size-8 text-terracotta transition-colors duration-500 group-hover:text-gold"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-14 text-sm font-bold tracking-[0.22em] text-forest transition-colors duration-500 group-hover:text-cream">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60 transition-colors duration-500 group-hover:text-cream/70">
                  {p.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
