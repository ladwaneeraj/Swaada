"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { business } from "@/data/swaada";
import { useReveal } from "@/lib/useReveal";
import { Eyebrow, MagneticLink, Words } from "./ui";

export default function LocationSection() {
  const ref = useReveal<HTMLElement>();
  const { address, hours } = business;

  return (
    <section ref={ref} id="visit" className="bg-cream py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2 md:px-8">
        <div>
          <Eyebrow>Visit us</Eyebrow>
          <Words
            as="h2"
            text="Find your way to Swaada."
            className="font-display text-5xl leading-[1.05] text-forest md:text-6xl"
          />

          <dl className="mt-10 space-y-6">
            <div className="flex gap-4" data-reveal>
              <MapPin className="mt-1 size-5 shrink-0 text-terracotta" aria-hidden />
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink/45">
                  Address
                </dt>
                <dd className="mt-1 leading-relaxed text-ink/80">
                  {address.street}
                  <br />
                  {address.landmark}
                  <br />
                  {address.locality}, {address.city}, {address.region}{" "}
                  {address.postalCode}
                </dd>
              </div>
            </div>
            <div className="flex gap-4" data-reveal>
              <Phone className="mt-1 size-5 shrink-0 text-terracotta" aria-hidden />
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink/45">
                  Phone
                </dt>
                <dd className="mt-1 space-x-3">
                  <a
                    href={business.phoneHref}
                    className="text-ink/80 underline-offset-4 hover:underline"
                  >
                    {business.phone}
                  </a>
                  <span className="text-ink/30">·</span>
                  <a
                    href={business.phone2Href}
                    className="text-ink/80 underline-offset-4 hover:underline"
                  >
                    {business.phone2}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-4" data-reveal>
              <Clock className="mt-1 size-5 shrink-0 text-terracotta" aria-hidden />
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink/45">
                  Hours
                </dt>
                <dd className="mt-1 text-ink/80">
                  {hours.text} · {hours.days}
                  {!hours.ownerConfirmed && (
                    <span className="mt-0.5 block text-xs text-ink/45">
                      As listed online — call ahead to confirm.
                    </span>
                  )}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-4" data-reveal>
            <MagneticLink href={business.links.directions} className="btn-forest" external arrow>
              Get Directions
            </MagneticLink>
            <MagneticLink
              href={business.phoneHref}
              className="btn !border !border-forest/25 text-forest hover:bg-forest/5"
            >
              <Phone className="size-4" aria-hidden /> Call Swaada
            </MagneticLink>
          </div>
        </div>

        <div
          className="overflow-hidden rounded-3xl border border-forest/10 shadow-2xl shadow-forest/15"
          data-reveal
        >
          <iframe
            src={business.links.mapEmbed}
            title="Map showing Swaada || Davanagere on NH4, Kunduwada"
            className="h-[420px] w-full md:h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
