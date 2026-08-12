# Site images

Images are downloaded automatically by `scripts/fetch-images.mjs`
(runs on `npm install` and before `npm run dev` / `npm run build`;
manual run: `npm run images`). They are converted to optimized JPGs
in this folder.

The current set is AI-generated visuals made to match the Swaada
nursery-café concept (greenery, coffee, warm light). They make the
site feel real, but they are not photos of the actual location.
Replace any of them with real photographs of Swaada: drop a photo
with the same filename into this folder — the fetch script never
overwrites an existing file — or use a new name and update the path
in `src/data/swaada.ts`.

| File | Used for | Suggested real shot |
|---|---|---|
| hero.jpg | Hero background | Wide: seating + dense plants + warm light |
| story-large.jpg | Our Story, main image | Café interior with greenery |
| story-small-a.jpg | Our Story, floating (portrait) | Plant / nursery detail |
| story-small-b.jpg | Our Story, floating | A dish or coffee on a table |
| nursery.jpg | Nursery × Café (wide) | Potted plants beside seating |
| coffee-moment.jpg | Coffee section + escape "Coffee" + insta | Close-up coffee, moody light |
| escape-*.jpg | Green Escape panels (portrait) | Entrance, plants, seating, café, food, evening |
| food-*.jpg | Menu category cards | One photo per category |
| gallery-*.jpg | Gallery extras | People, evening, plants, café corner, outdoor |
