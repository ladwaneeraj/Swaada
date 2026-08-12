"use client";

import { Star } from "lucide-react";
import { business, reviews } from "@/data/swaada";
import { useReveal } from "@/lib/useReveal";
import { Eyebrow, MagneticLink, Words } from "./ui";

function Stars({ value }: { value: number }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`size-5 ${
            i <= Math.round(value) ? "fill-gold text-gold" : "text-cream/25"
          }`}
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useReveal<HTMLElement>();
  const { rating } = business;
  // Duplicate list for a seamless marquee when reviews exist
  const marquee = reviews.length > 0 ? [...reviews, ...reviews] : [];

  return (
    <section ref={ref} id="reviews" className="bg-forest py-28 text-cream md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <Eyebrow tone="text-gold">What the road says</Eyebrow>
            <Words
              as="h2"
              text="Loved by travellers and locals."
              className="font-display text-5xl leading-[1.05] md:text-6xl"
            />
          </div>
          <div className="flex items-center gap-8 md:justify-end" data-reveal>
            <p className="font-display text-8xl leading-none text-gold md:text-9xl">
              {rating.value}
            </p>
            <div>
              <Stars value={rating.value} />
              <p className="mt-2 text-sm text-cream/70">
                {rating.count}+ {rating.source} reviews
              </p>
              <MagneticLink
                href={business.links.maps}
                className="btn-outline mt-4 !px-5 !py-2.5"
                external
                arrow
              >
                See all reviews
              </MagneticLink>
            </div>
          </div>
        </div>

        {marquee.length > 0 ? (
          <div className="mt-16 overflow-hidden" aria-label="Guest reviews">
            <div className="marquee flex w-max gap-5">
              {marquee.map((r, i) => (
                <blockquote
                  key={i}
                  className="w-[320px] shrink-0 rounded-2xl border border-cream/10 bg-forest-deep/60 p-7"
                  aria-hidden={i >= reviews.length}
                >
                  <Stars value={r.rating} />
                  <p className="mt-4 text-sm leading-relaxed text-cream/80">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <footer className="mt-4 text-xs tracking-wide text-gold">
                    — {r.author}, on Google
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-14 max-w-lg text-sm text-cream/50" data-reveal>
            Real guest reviews live on Google — tap through to read what
            people say about the greenery, the coffee and the quiet.
          </p>
        )}
      </div>
    </section>
  );
}
