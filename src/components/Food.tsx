"use client";

import { business, menu } from "@/data/swaada";
import { useReveal } from "@/lib/useReveal";
import { Eyebrow, Frame, Words } from "./ui";
import { LeafMark } from "./Botanical";

export default function Food() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="menu" className="bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>From the kitchen</Eyebrow>
            <Words
              as="h2"
              text={"Come hungry.\nLeave happy."}
              className="font-display text-5xl leading-[1.04] text-forest md:text-7xl"
            />
          </div>
          <p className="max-w-sm text-ink/60" data-reveal>
            Indian and Italian-inspired café food — made for road-trip
            appetites and slow afternoons alike.
          </p>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {menu.map((cat, i) => (
            <li
              key={cat.title}
              className={`card-hover group relative overflow-hidden rounded-2xl bg-offwhite shadow-md shadow-forest/10 ${
                i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-1" : ""
              }`}
              data-reveal
              data-delay={`${(i % 4) * 0.08}`}
            >
              <Frame
                src={cat.image}
                alt={`${cat.title} at Swaada café, Davanagere`}
                className="aspect-[4/3]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                rounded="rounded-none"
              />
              <LeafMark className="absolute right-4 top-4 size-6 text-cream/0 transition-all duration-500 group-hover:text-cream/90 group-hover:rotate-12" />
              <div className="p-6">
                <h3 className="font-display text-2xl text-forest transition-transform duration-500 group-hover:-translate-y-0.5">
                  {cat.title}
                </h3>
                <p className="mt-1 text-sm text-ink/60">{cat.blurb}</p>
                {cat.items.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-forest/10 pt-4">
                    {cat.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-baseline justify-between gap-3 text-sm"
                      >
                        <span className="text-ink/80">{item.name}</span>
                        {item.price && (
                          <span className="text-terracotta">{item.price}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-ink/45" data-reveal>
          Menu highlights — ask at the counter for today&apos;s full menu and
          prices, or call{" "}
          <a href={business.phoneHref} className="text-terracotta underline underline-offset-2">
            {business.phone}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
