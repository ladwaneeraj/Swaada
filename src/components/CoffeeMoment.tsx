"use client";

import Image from "next/image";
import { images } from "@/data/swaada";
import { useReveal } from "@/lib/useReveal";
import { Words } from "./ui";

export default function CoffeeMoment() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80svh] items-center overflow-hidden bg-ink text-cream"
    >
      <div className="absolute inset-0" data-parallax="0.12">
        <Image
          src={images.coffeeMoment}
          alt="Close-up of a cup of coffee at Swaada, lit by warm evening light"
          fill
          sizes="100vw"
          className="scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
      </div>

      {/* warm light + grain feel */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 78% 30%, rgba(217,164,65,0.28), transparent 70%)",
        }}
        aria-hidden
      />

      {/* subtle steam */}
      <svg
        className="absolute right-[14%] top-[26%] hidden w-16 md:block"
        viewBox="0 0 60 100"
        fill="none"
        aria-hidden
      >
        {[14, 30, 46].map((x) => (
          <path
            key={x}
            className="steam"
            d={`M${x} 92 C ${x - 8} 70, ${x + 8} 52, ${x} 30 C ${x - 6} 18, ${x + 4} 10, ${x} 2`}
            stroke="#f4efe6"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        ))}
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-8">
        <p className="eyebrow text-gold" data-reveal>
          The coffee moment
        </p>
        <Words
          as="h2"
          text={"Take a moment.\nHave a coffee."}
          className="font-display mt-6 text-6xl leading-[1.02] md:text-8xl"
        />
        <p className="mt-7 max-w-md text-cream/70" data-reveal>
          Somewhere between Davanagere and everywhere else, there&apos;s a
          warm cup waiting under the leaves.
        </p>
      </div>
    </section>
  );
}
