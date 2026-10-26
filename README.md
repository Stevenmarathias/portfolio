# Steven Marathias · Portfolio

Personal analytics portfolio. Next.js (App Router) + TypeScript + Tailwind, scaffolded with `create-next-app`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

- `src/app/page.tsx` — homepage sections (hero, stats, work, about, résumé, contact)
- `src/app/work/*/page.tsx` — one case-study page per featured project
- `src/lib/coursework.ts` — the draggable coursework strip
- `src/components/Hero.tsx` — animated catch-radius scene
- `src/components/charts.tsx` — SVG charts drawn from real project numbers
- `src/app/globals.css` — design tokens and styles
- `public/` — headshot and résumé PDF

## Deploy

Import the repo at vercel.com/new. No settings needed.
