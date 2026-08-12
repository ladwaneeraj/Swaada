"use client";

import Image from "next/image";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { reducedMotion } from "@/lib/gsap";

/** Word-split heading — pairs with [data-reveal-word] animation. */
export function Words({
  text,
  className = "",
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag className={className} data-reveal-word>
      {text.split("\n").map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="rw">
              <span>{word}&nbsp;</span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({
  children,
  tone = "text-terracotta",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return (
    <p className={`eyebrow ${tone} mb-5 flex items-center gap-3`} data-reveal>
      <span className="inline-block h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

/** Magnetic button — subtle pull toward the cursor on desktop. */
export function MagneticLink({
  href,
  children,
  className = "",
  arrow = false,
  external = false,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
  external?: boolean;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || reducedMotion() || !window.matchMedia("(hover: hover)").matches)
      return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`btn ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {arrow && <ArrowRight className="btn-arrow size-4" aria-hidden />}
    </a>
  );
}

/** Framed image with hover zoom; fill layout. */
export function Frame({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  rounded = "rounded-2xl",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
}) {
  return (
    <div className={`img-frame ${rounded} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
