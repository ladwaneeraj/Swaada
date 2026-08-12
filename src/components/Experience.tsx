"use client";

import { images } from "@/data/swaada";
import { useReveal } from "@/lib/useReveal";
import { Eyebrow, Frame, Words } from "./ui";
import { VineLine } from "./Botanical";

export default function Experience() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="story"
      className="relative overflow-hidden bg-offwhite py-28 md:py-40"
    >
      <VineLine className="absolute right-6 top-14 w-44 text-sage/50 md:w-64" />

      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:gap-10 md:px-8">
        <div className="max-w-xl">
          <Eyebrow>The Swaada Experience</Eyebrow>
          <Words
            as="h2"
            text={"Not just a café.\nA place to slow down."}
            className="font-display text-5xl leading-[1.04] text-forest md:text-7xl"
          />
          <p
            className="mt-8 text-lg leading-relaxed text-ink/70"
            data-reveal
          >
            Swaada brings together good food, coffee and the calming feeling
            of being surrounded by greenery — making it a refreshing stop in
            Davanagere.
          </p>
          <p className="mt-4 leading-relaxed text-ink/60" data-reveal>
            Set on NH4 at Kunduwada, beside the Kisan Bandhu nursery, it is
            the kind of place people pull over for on a long drive — and the
            kind locals come back to when the week gets loud.
          </p>
          <div className="divider-line mt-10" data-reveal />
          <p
            className="font-display mt-6 text-2xl italic text-leaf"
            data-reveal
          >
            &ldquo;Good food. Good coffee. Good green.&rdquo;
          </p>
        </div>

        {/* Asymmetric image cluster */}
        <div className="relative min-h-[480px] md:min-h-[560px]">
          <div
            className="absolute left-0 top-0 h-[70%] w-[74%]"
            data-parallax="0.1"
          >
            <Frame
              src={images.storyLarge}
              alt="The café at Swaada with greenery all around"
              className="h-full w-full shadow-2xl shadow-forest/20"
              sizes="(max-width: 768px) 74vw, 38vw"
            />
          </div>
          <div
            className="absolute bottom-[4%] right-0 h-[46%] w-[42%]"
            data-parallax="-0.16"
          >
            <Frame
              src={images.storySmallA}
              alt="Plants growing at the Swaada nursery"
              className="h-full w-full shadow-xl shadow-forest/25"
              sizes="(max-width: 768px) 42vw, 21vw"
            />
          </div>
          <div
            className="absolute bottom-0 left-[10%] h-[32%] w-[38%]"
            data-parallax="0.22"
          >
            <Frame
              src={images.storySmallB}
              alt="Café food served amid the greenery at Swaada"
              className="h-full w-full shadow-xl shadow-forest/25"
              sizes="(max-width: 768px) 38vw, 19vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
