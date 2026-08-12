import { MapPin, Phone } from "lucide-react";
import { business, nav } from "@/data/swaada";
import { LeafMark, VineLine } from "./Botanical";

export default function Footer() {
  const { address } = business;
  return (
    <footer className="relative overflow-hidden bg-forest-deep pb-28 pt-20 text-cream md:pb-16">
      <VineLine className="absolute -top-2 left-8 w-56 text-moss/40" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3 md:px-8">
        <div>
          <p className="flex items-center gap-2">
            <LeafMark className="size-7 text-terracotta" />
            <span className="font-display text-3xl tracking-[0.14em]">SWĀDA</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Food. Coffee. Greenery. Good times.
          </p>
          <p className="mt-6 text-xs text-cream/40">
            {business.type}
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="eyebrow text-gold/80">Explore</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-cream/70 transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow text-gold/80">Find us</h3>
          <address className="mt-5 space-y-3 text-sm not-italic text-cream/70">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden />
              <span>
                {address.street}, {address.landmark}, {address.locality},{" "}
                {address.city}, {address.region} {address.postalCode}
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-terracotta" aria-hidden />
              <span>
                <a href={business.phoneHref} className="hover:text-gold">
                  {business.phone}
                </a>
                {" · "}
                <a href={business.phone2Href} className="hover:text-gold">
                  {business.phone2}
                </a>
              </span>
            </p>
            <p>
              <a
                href={business.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-gold"
              >
                Open in Google Maps →
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-cream/10 px-6 pt-6 md:px-8">
        <p className="text-xs text-cream/35">
          © {new Date().getFullYear()} {business.name}. A green stop on NH4,
          Kunduwada, Davanagere.
        </p>
      </div>
    </footer>
  );
}
