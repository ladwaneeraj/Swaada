"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { business } from "@/data/swaada";

/** App-style bottom action bar on mobile, after leaving the hero. */
export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-4 bottom-4 z-40 grid grid-cols-2 gap-2 rounded-2xl border border-cream/10 bg-forest-deep/90 p-2 shadow-2xl shadow-forest-deep/50 backdrop-blur-md transition-all duration-500 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <a href={business.phoneHref} className="btn !py-3 justify-center bg-cream/10 text-cream">
        <Phone className="size-4" aria-hidden /> Call
      </a>
      <a
        href={business.links.directions}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-solid !py-3 justify-center"
      >
        <MapPin className="size-4" aria-hidden /> Directions
      </a>
    </div>
  );
}
