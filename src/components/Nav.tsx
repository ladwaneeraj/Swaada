"use client";

import { useEffect, useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { business, nav } from "@/data/swaada";
import { LeafMark } from "./Botanical";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = nav
      .map((n) => document.querySelector(n.href))
      .filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-forest-deep/85 py-2.5 shadow-lg shadow-forest-deep/30 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8"
        aria-label="Main"
      >
        <a href="#home" className="flex items-center gap-2 text-cream">
          <LeafMark className="size-6 text-terracotta" />
          <span className="font-display text-2xl tracking-[0.14em]">
            SWĀDA
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <li key={item.href} className="relative">
              <a
                href={item.href}
                className={`text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  active === item.href
                    ? "text-gold"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {item.label}
              </a>
              {active === item.href && (
                <LeafMark className="absolute -bottom-3.5 left-1/2 size-2.5 -translate-x-1/2 text-gold" />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={business.links.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid hidden !py-2.5 !px-5 md:inline-flex"
          >
            <MapPin className="size-4" aria-hidden />
            Get Directions
          </a>
          <button
            className="text-cream lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-7" /> : <Menu className="size-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-0 -z-10 flex flex-col justify-center bg-forest-deep px-8 transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="space-y-5">
          {nav.map((item, i) => (
            <li
              key={item.href}
              style={{
                transition: `transform 0.5s ${0.06 * i}s, opacity 0.5s ${0.06 * i}s`,
                transform: open ? "none" : "translateY(20px)",
                opacity: open ? 1 : 0,
              }}
            >
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-cream"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={business.links.directions}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-solid mt-10 self-start"
        >
          <MapPin className="size-4" aria-hidden /> Get Directions
        </a>
      </div>
    </header>
  );
}
