/**
 * Downloads the site's photography into public/images and converts
 * it to optimized JPGs. Runs automatically on `npm install` (postinstall)
 * and before dev/build if any image is missing. Re-run manually with:
 *   npm run images
 *
 * The images are AI-generated visuals (Higgsfield / Nano Banana Pro)
 * made for the Swaada nursery-café concept. Replace any of them with
 * real photographs by dropping a file with the same name into
 * public/images — this script never overwrites an existing file.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(OUT, { recursive: true });

const CDN =
  "https://d8j0ntlcm91z4.cloudfront.net/user_2xzkvpkvmJQIrtDEXL4NWsI12k5";

/** slot → [file-id, max width in px] */
const IMAGES = {
  "hero": ["hf_20260812_071501_fc0f1e80-7dfd-4585-983e-7f7a4664fbe2", 2400],
  "nursery": ["hf_20260812_071501_07c3132c-a216-497f-a0a0-724a6632e588", 2200],
  "coffee-moment": ["hf_20260812_071501_18235abd-43c3-46fa-8db8-4c2f5af6eaf4", 2200],
  "story-large": ["hf_20260812_071501_0163306b-0331-4631-8cc2-f6b5a9753056", 1400],
  "story-small-a": ["hf_20260812_071501_0c3facda-411b-4dc1-9c91-ce09ce1004b1", 1000],
  "story-small-b": ["hf_20260812_071501_0d6d454d-1c12-4ece-8d30-64c0583acf57", 1200],
  "escape-entrance": ["hf_20260812_071501_4a3b7a4c-fbed-46e0-93a5-634b4a4757c9", 1000],
  "escape-plants": ["hf_20260812_071501_3e44dcdd-8c32-4d50-a540-9680ccd81435", 1000],
  "escape-seating": ["hf_20260812_071501_36d4206e-e5c4-4e48-89ce-1637e5a0f493", 1000],
  "escape-cafe": ["hf_20260812_071501_fbcd5186-3503-406e-ac4c-3375c81fbf70", 1000],
  "escape-food": ["hf_20260812_071502_091c21d1-6b68-4a12-be4f-9465ae6ac661", 1000],
  "escape-evening": ["hf_20260812_071501_3f32910e-0ad0-4519-9a0d-d5e2eda96ef8", 1000],
  "food-pizza": ["hf_20260812_071522_999283fe-0d8b-4205-ad77-2fd2def44338", 1200],
  "food-pasta": ["hf_20260812_071522_6aeccc15-6ff1-49ab-955d-740c98c80c99", 1200],
  "food-sandwich": ["hf_20260812_071522_ae09955c-9e65-4624-8cb5-062f20845b58", 1200],
  "food-wrap": ["hf_20260812_071522_024b8364-6f9b-42be-8cda-f25511935cb5", 1200],
  "food-fastfood": ["hf_20260812_071522_8353df92-800d-4979-9b9e-9ea809567b18", 1200],
  "food-beverages": ["hf_20260812_071522_3f880dc1-2d8f-454d-9cc1-80abb7783fe3", 1200],
  "food-coffee": ["hf_20260812_071522_d29c81e3-c70e-4993-9023-c21c985a68cd", 1200],
  "gallery-people-1": ["hf_20260812_071522_70a949d0-9fed-45bd-9bbd-67afb1056aa2", 1000],
  "gallery-evening-1": ["hf_20260812_071522_6aa71ae2-f0b2-4bb7-97f8-64ebde3ec047", 1000],
  "gallery-plants-1": ["hf_20260812_071522_c2ec41b3-4b79-49d0-b62f-555e57983210", 1000],
  "gallery-cafe-2": ["hf_20260812_071522_48e48d83-be16-42f3-9bb0-5c3532188c2c", 1200],
  "gallery-outdoor-1": ["hf_20260812_071522_52872256-51e4-4a65-a000-4380a7bfb4c4", 1264],
};

export const missingImages = () =>
  Object.keys(IMAGES).filter((n) => !existsSync(join(OUT, `${n}.jpg`)));

async function main() {
  const missing = missingImages();
  if (missing.length === 0) {
    console.log("[images] all site images present — nothing to do");
    return;
  }

  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn("[images] sharp not installed — saving originals as PNG-in-JPG is not possible; run `npm install` first");
    process.exitCode = 0;
    return;
  }

  console.log(`[images] fetching ${missing.length} image(s)…`);
  let failed = 0;
  for (const name of missing) {
    const [id, width] = IMAGES[name];
    const url = `${CDN}/${id}.png`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const jpg = await sharp(buf)
        .resize({ width, withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toBuffer();
      writeFileSync(join(OUT, `${name}.jpg`), jpg);
      console.log(`  ✓ ${name}.jpg (${Math.round(jpg.length / 1024)} KB)`);
    } catch (err) {
      failed++;
      console.warn(`  ✗ ${name}: ${err.message}`);
    }
  }
  if (failed > 0) {
    console.warn(
      `[images] ${failed} download(s) failed — re-run \`npm run images\` on a machine with internet access.`
    );
  }
}

main();
