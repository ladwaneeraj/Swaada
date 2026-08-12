/**
 * ─────────────────────────────────────────────────────────────
 *  SWAADA — single source of truth for all site content.
 *  Edit this file to update the website. No component changes
 *  are needed for text, menu, images, reviews or contact info.
 * ─────────────────────────────────────────────────────────────
 */

export const business = {
  name: "Swaada || Davanagere",
  shortName: "Swaada",
  displayName: "SWĀDA",
  tagline: "A little taste of nature.",
  subline: "Coffee, food & a peaceful green escape on NH4, Davanagere.",
  type: "Nursery-cum-Café · Highway Hangout",
  phone: "+91 99022 88689",
  phoneHref: "tel:+919902288689",
  phone2: "+91 63618 00647",
  phone2Href: "tel:+916361800647",
  address: {
    street: "NH4, beside Kisan Bandhu Vevāsāya Nursery",
    landmark: "Opposite Bharat Petroleum",
    locality: "Kunduwada",
    city: "Davanagere",
    region: "Karnataka",
    postalCode: "577004",
    country: "IN",
  },
  geo: {
    latitude: 14.4471728,
    longitude: 75.8847811,
  },
  // Listed on Tripadvisor as 11:30 AM – 9:30 PM, open daily.
  // NOT yet confirmed by the owner — the UI labels these as
  // "as listed online". Set ownerConfirmed: true once verified.
  hours: {
    text: "11:30 AM – 9:30 PM",
    days: "Open daily",
    ownerConfirmed: false,
    schema: {
      opens: "11:30",
      closes: "21:30",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
    },
  },
  rating: {
    value: 4.4,
    count: 462,
    source: "Google",
  },
  links: {
    // Google Business Profile (verified, supplied by owner)
    maps: "https://www.google.com/maps/place/Swaada+%7C%7C+Davanagere/@14.4470588,75.8848234,21z/data=!4m6!3m5!1s0x3bba2fb35a55826f:0x235e2d77f596f841!8m2!3d14.4471728!4d75.8847811!16s%2Fg%2F11ng03fx93",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=14.4471728,75.8847811&destination_place_id=ChIJb4JVWrMvujsRQfiW9XctXiM",
    mapEmbed:
      "https://maps.google.com/maps?q=14.4471728,75.8847811&z=16&output=embed",
    // No verified Instagram handle was found in public listings.
    // Add it here once confirmed (e.g. "https://instagram.com/…")
    // and the Instagram section will link to it automatically.
    instagram: null as string | null,
  },
  // Set this to the live domain before deploying (used for
  // canonical URLs, sitemap and Open Graph).
  siteUrl: "https://swaada-davanagere.example.com",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Green Space", href: "#green" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit Us", href: "#visit" },
];

/**
 * Food categories — verified associations only (no invented
 * dishes or prices). To list real menu items, add them to the
 * `items` array of a category: { name, description, price }.
 */
export type MenuItem = { name: string; description?: string; price?: string };
export type MenuCategory = {
  title: string;
  blurb: string;
  image: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    title: "Pizza",
    blurb: "Café-style pizzas, made to order.",
    image: "/images/food-pizza.jpg",
    items: [],
  },
  {
    title: "Pasta",
    blurb: "Italian-inspired comfort on a plate.",
    image: "/images/food-pasta.jpg",
    items: [],
  },
  {
    title: "Sandwiches",
    blurb: "Grilled, stacked and easy to love.",
    image: "/images/food-sandwich.jpg",
    items: [],
  },
  {
    title: "Wraps",
    blurb: "Quick, hearty rolls for the road.",
    image: "/images/food-wrap.jpg",
    items: [],
  },
  {
    title: "Fast Food",
    blurb: "Familiar café favourites, done well.",
    image: "/images/food-fastfood.jpg",
    items: [],
  },
  {
    title: "Beverages",
    blurb: "Coolers and refreshers for the highway heat.",
    image: "/images/food-beverages.jpg",
    items: [],
  },
  {
    title: "Coffee & Tea",
    blurb: "The reason many people stop here twice.",
    image: "/images/food-coffee.jpg",
    items: [],
  },
];

/** Why-people-stop cards */
export const pillars = [
  {
    icon: "plate",
    title: "GOOD FOOD",
    text: "Fresh café favourites and comfort food.",
  },
  {
    icon: "coffee",
    title: "GOOD COFFEE",
    text: "A place to pause during the journey.",
  },
  {
    icon: "leaf",
    title: "GOOD GREENERY",
    text: "A refreshing environment surrounded by plants.",
  },
  {
    icon: "sun",
    title: "GOOD VIBES",
    text: "A peaceful place to meet, relax and hang out.",
  },
];

/**
 * Reviews — intentionally empty. Do NOT invent testimonials.
 * Paste real Google reviews here (with attribution) and they
 * will render automatically:
 * { author: "…", rating: 5, text: "…" }
 */
export type Review = { author: string; rating: number; text: string };
export const reviews: Review[] = [];

/** Horizontal "Green Escape" panels */
export const escape = [
  { label: "Entrance", image: "/images/escape-entrance.jpg" },
  { label: "Plants", image: "/images/escape-plants.jpg" },
  { label: "Seating", image: "/images/escape-seating.jpg" },
  { label: "Café atmosphere", image: "/images/escape-cafe.jpg" },
  { label: "Food", image: "/images/escape-food.jpg" },
  { label: "Coffee", image: "/images/coffee-moment.jpg" },
  { label: "Evening ambience", image: "/images/escape-evening.jpg" },
];

/** Masonry gallery */
export type GalleryItem = {
  image: string;
  category: string;
  alt: string;
  tall?: boolean;
};
export const gallery: GalleryItem[] = [
  { image: "/images/escape-seating.jpg", category: "Café", alt: "Café seating among plants at Swaada, Davanagere", tall: true },
  { image: "/images/food-pizza.jpg", category: "Food", alt: "Café food served at Swaada" },
  { image: "/images/food-coffee.jpg", category: "Coffee", alt: "Coffee served at Swaada café" },
  { image: "/images/gallery-plants-1.jpg", category: "Plants", alt: "Nursery plants and pots at Swaada", tall: true },
  { image: "/images/gallery-outdoor-1.jpg", category: "Outdoor", alt: "Outdoor green seating area at Swaada" },
  { image: "/images/gallery-people-1.jpg", category: "People", alt: "Guests relaxing at Swaada café" },
  { image: "/images/gallery-evening-1.jpg", category: "Evening", alt: "Evening ambience at Swaada on NH4", tall: true },
  { image: "/images/escape-plants.jpg", category: "Plants", alt: "Green foliage inside the Swaada nursery café" },
  { image: "/images/gallery-cafe-2.jpg", category: "Café", alt: "A quiet café corner at Swaada, Davanagere" },
];

/** Instagram-style grid */
export const instaGrid = [
  { image: "/images/story-small-a.jpg", alt: "Greenery at Swaada nursery café" },
  { image: "/images/coffee-moment.jpg", alt: "Coffee moment at Swaada" },
  { image: "/images/gallery-plants-1.jpg", alt: "Plants for sale at the nursery" },
  { image: "/images/escape-food.jpg", alt: "Café food at Swaada Davanagere" },
  { image: "/images/gallery-outdoor-1.jpg", alt: "Sunlit seating at Swaada" },
  { image: "/images/escape-evening.jpg", alt: "Evening lights at Swaada café" },
];

/** Hero + section imagery */
export const images = {
  hero: "/images/hero.jpg",
  storyLarge: "/images/story-large.jpg",
  storySmallA: "/images/story-small-a.jpg",
  storySmallB: "/images/story-small-b.jpg",
  nursery: "/images/nursery.jpg",
  coffeeMoment: "/images/coffee-moment.jpg",
};

export const seo = {
  title: "Swaada || Davanagere — Nursery Café & Highway Hangout on NH4",
  description:
    "Swaada is a peaceful nursery-cum-café on NH4, Kunduwada, Davanagere — coffee, pizza, pasta, sandwiches and wraps surrounded by greenery. Rated 4.4★ on Google.",
  keywords: [
    "Swaada Davanagere",
    "Swaada Cafe Davanagere",
    "cafe in Davanagere",
    "best cafe in Davanagere",
    "cafe near NH4 Davanagere",
    "highway cafe Davanagere",
    "cafes near Kunduwada",
    "coffee shop Davanagere",
    "restaurants near NH4 Davanagere",
    "nursery cafe Davanagere",
  ],
};
