# Peruvian Pot

A trilingual recipe site celebrating the food of Peru — from the ceviche of the coast, to the stews of the Andes, to the Amazonian rainforest. Browse recipes, read the blog, save favorites, and rate dishes in English, Spanish, or Quechua.

Live site: [peruvianpot.com](https://peruvianpot.com)

## What's inside

- **12 recipes** across three regions (Costa, Sierra, Selva), each fully translated into English, Spanish, and Quechua
- **Blog** with long-form posts on Peruvian cuisine, history, and pantry essentials
- **Favorites** stored locally so visitors can build their own collection
- **Ratings & comments** backed by Firebase Firestore
- **Trilingual UI** — every label, button, and tooltip ships in `en` / `es` / `qu`
- **Static prerendering** of every public route via Puppeteer for fast first paint and clean SEO
- **Responsive WebP imagery** generated at build time with Sharp

## Tech stack

| Layer       | Choice                                           |
| ----------- | ------------------------------------------------ |
| Build       | Vite 7 + `@vitejs/plugin-react-swc`              |
| Framework   | React 19 + TypeScript 5.9                        |
| Routing     | React Router v7 (unified `react-router` package) |
| Styling     | SCSS modules with shared abstracts               |
| Data        | Firebase Firestore (ratings + comments only)     |
| SEO         | Prerendered HTML, sitemap, hreflang, OG/Twitter  |
| Path alias  | `@` → `src/`                                     |

## Project structure

```
src/
├── config/         Firebase init, route table
├── contexts/       Language, Recipe, Firebase, Favorites providers
├── data/
│   ├── i18n/       en.json / es.json / qu.json
│   ├── recipes/    Static recipe JSON (12 recipes)
│   └── blog/       Blog posts as JSON + index
├── features/       Page-level features (home, menu, region, recipe, blog, favorites, privacy, not-found)
├── shared/         Reusable components, hooks, types, utils
└── styles/         SCSS abstracts, layout, components

scripts/
├── prerender.mjs              Puppeteer-driven static prerender
├── generate-responsive-images.mjs  Sharp-based WebP pipeline
├── seed-firestore.mjs         Seed Firestore for local dev
└── check-hydration.mjs        Hydration-mismatch sanity check
```

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>.

### Environment variables

Create a `.env.local` at the project root with your Firebase web config:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

The app degrades gracefully when Firebase isn't configured — ratings and comments simply stay hidden rather than throwing.

## Scripts

| Script                       | What it does                                                  |
| ---------------------------- | ------------------------------------------------------------- |
| `npm run dev`                | Start the Vite dev server with HMR                            |
| `npm run build`              | Type-check, build, then prerender every public route          |
| `npm run preview`            | Serve the production build locally                            |
| `npm run lint`               | Run ESLint across the project                                 |
| `npm run generate-images`    | Regenerate responsive WebP variants from source images        |

## Internationalization

There are two distinct mechanisms:

- `t('some.key')` — looks up UI strings in `src/data/i18n/{en,es,qu}.json`
- `localize(obj)` — picks the active language out of a `LocalizedString` object (recipe titles, ingredient names, step instructions, etc.)

Adding a new language means dropping a new JSON file, extending the `LocalizedString` type, and adding the language option to the switcher.

## Adding a recipe

1. Append a new entry to `src/data/recipes/recipes.json` with `en`/`es`/`qu` for every translatable field.
2. Drop the hero image into `public/images/recipes/<slug>.webp` (run `npm run generate-images` to produce responsive variants if you start from a larger source).
3. Add the route to `public/sitemap.xml` so it gets prerendered.

## Adding a blog post

1. Create a JSON file in `src/data/blog/posts/<slug>.json` matching the `BlogPost` type.
2. Import it in `src/data/blog/posts/index.ts` — the list is sorted by `date` descending automatically.

## Deployment

The build emits a fully static `dist/` directory, including a prerendered HTML file per public route plus a `200.html` SPA fallback for client-routed pages like `/favorites`. Any static host works (Firebase Hosting, Netlify, Cloudflare Pages, GitHub Pages). The repo includes `firebase.json` configured for Firebase Hosting.

```bash
npm run build
firebase deploy --only hosting
```

## License

All rights reserved. Recipes, translations, photography, and blog content are the work of the author.
