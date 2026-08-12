# Swaada || Davanagere — website

A single-page site for Swaada, the nursery-cum-café on NH4,
Kunduwada, Davanagere. Built with Next.js (App Router), TypeScript,
Tailwind CSS v4, GSAP + ScrollTrigger, Lenis and Lucide icons.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

All changeable content lives in one file: `src/data/swaada.ts` —
contact details, hours, menu, reviews, gallery, image paths, SEO
text. Components read from it; you should never need to touch a
component to update content.

Three things are deliberately left for the owner to confirm:

- **Opening hours** — currently 11:30 AM–9:30 PM daily, sourced
  from the Tripadvisor listing, flagged with `ownerConfirmed: false`
  (the site shows "as listed online — call ahead to confirm" until
  you flip it).
- **Instagram** — no verified handle was found, so
  `links.instagram` is `null` and the section links to Google
  photos instead. Add the real URL to enable "Follow Swaada".
- **Reviews** — the `reviews` array is empty on purpose. Paste real
  Google reviews (author + rating + text) and the marquee renders
  automatically. No testimonials were invented.
- **Menu items & prices** — category cards only. Add real items to
  `menu[n].items` and they appear on the cards.

Before deploying, set `business.siteUrl` to the real domain
(canonical URL, sitemap and Open Graph use it).

## Images

Photography is AI-generated to match the nursery-café concept and
downloads automatically on `npm install` (or `npm run images`) via
`scripts/fetch-images.mjs`, which also resizes and converts to
optimized JPG. See `public/images/README.md` for the full slot map.
Replace any image with a real photo of Swaada by dropping a file
with the same name into `public/images` — the script never
overwrites existing files.

## Accessibility & motion

Animations run through GSAP/Lenis and are fully disabled for
`prefers-reduced-motion` users (and without JavaScript), falling
back to a static page. Keyboard navigation, focus states, ARIA
labels and semantic landmarks are in place. LocalBusiness
(CafeOrCoffeeShop) structured data, sitemap and robots are
generated from the same data file.
