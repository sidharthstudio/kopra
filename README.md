# KOPRA — Website

A production-ready website for **KOPRA**, India's first non-alcoholic cocktail bar, on the third floor of Capitol Building, Nalanda Lane, Nanthancodu, Thiruvananthapuram 695003.

Built as a bespoke hospitality site — not a restaurant template — around KOPRA's actual concept: cocktails built from house ferments, fresh produce and Kerala flavours, with zero alcohol.

---

## Repository

- **GitHub repository:** https://github.com/sidharthstudio/kopra (private, branch `main`)
- Clone and run:

  ```bash
  git clone https://github.com/sidharthstudio/kopra.git
  cd kopra && npm install && npm run dev
  ```

- To publish later changes: `git add -A && git commit -m "…" && git push`.
- Secrets (`.env*`), the SQLite database (`data/`) and uploaded images (`public/uploads/`) are excluded by `.gitignore`.

---

## What is included

| Area | Detail |
| --- | --- |
| Public pages | Home, Story, Digital Menu, Reservations, Events & Experiences, Gallery, Private Events, Contact & Location, FAQ, 404 |
| 3D | React Three Fiber hero: lathed glass shell, liquid volume, ice, mint leaves, citrus wheel, physical lighting, mouse parallax, scroll-linked motion, CSS fallback when WebGL is unavailable |
| Motion | Framer Motion reveals and parallax, CSS 3D tilt cards, marquee, reduced-motion support throughout |
| Data | SQLite (Node's built-in `node:sqlite`), seeded with verified menu items, experiences and gallery |
| Forms | Server-validated reservation + enquiry forms, duplicate-safe rate limiting, pending (not auto-confirmed) status |
| Admin | Password + HMAC-signed session cookie, dashboard, reservation and enquiry management, full CRUD for menu categories, items, prices, photos, experiences and gallery, image uploads |
| SEO | Per-page metadata, LocalBusiness/BarOrPub + FAQ JSON-LD, sitemap, robots, Open Graph, semantic HTML, alt text |
| Ops | No external services or API keys required to run |

---

## Stack

- **Next.js 15** (App Router, React 19, TypeScript strict)
- **Tailwind CSS v4** with a custom token layer in `app/globals.css`
- **React Three Fiber / Drei / Three.js** for the 3D hero
- **Framer Motion** for scroll and reveal motion
- **node:sqlite** (Node ≥ 22.5, stable in 24) — no native modules, no ORM
- **next/font**: Fraunces (display) + Manrope (interface)

---

## Run locally

```bash
# 1. Requirements: Node.js 24 or newer
node -v

# 2. Install
npm install

# 3. Environment
cp .env.example .env.local
#    set a strong ADMIN_PASSWORD and ADMIN_SESSION_SECRET

# 4. Develop
npm run dev          # http://localhost:3000

# 5. Production build
npm run build
npm start
```

The SQLite database is created and seeded automatically at `data/kopra.db` on first request. To recreate it:

```bash
npm run db:seed      # wipe + reseed
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Yes (production) | Password for `/admin`. Defaults to `kopra-admin-2026` in development only. |
| `ADMIN_SESSION_SECRET` | Yes (production) | HMAC key for the admin session cookie. `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin used in metadata, sitemap and JSON-LD (e.g. `https://kopra.in`). |
| `KOPRA_DB_PATH` | Optional | Absolute path for the SQLite file (useful on hosts with a mounted volume). |
| `NEXT_ALLOWED_DEV_ORIGINS` | Optional | Comma-separated extra hostnames for preview/dev. |

> Never commit `.env*` files. `.gitignore` already excludes them, along with `/data/*.db` and `/public/uploads/*`.

---

## Admin dashboard

1. Go to `/admin` — you are redirected to `/admin/login`.
2. Sign in with `ADMIN_PASSWORD`.
3. Manage:
   - **Reservations** — confirm, decline, reset. Guest contact details are click-to-call / mailto.
   - **Enquiries** — private events, workshops, group bookings and contact messages; mark new / in progress / closed.
   - **Menu & prices** — categories and items, ingredient lists, allergen notes, prices, signatures, visibility, photo URL *or* upload.
   - **Experiences** — events, dates, prices, publication state.
   - **Gallery** — captions, categories, ordering, uploads.

Sessions last 8 hours. The cookie is `HttpOnly`, `SameSite=Lax`, and `Secure` in production. Every server action re-checks the session before writing.

**Before launch:** change `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`, and serve the site over HTTPS.

---

## Content accuracy

All business facts live in [`lib/business.ts`](lib/business.ts) (single source of truth) and [`lib/content.ts`](lib/content.ts). Verified sources and outstanding questions are documented in [`docs/BUSINESS-DATA.md`](docs/BUSINESS-DATA.md).

Key rule baked into the site: **nothing unverified is presented as fact.**

- Drink prices are not published by KOPRA → stored as `NULL` and rendered as “Price on request”, with an explicit note on the menu page.
- No online ordering or delivery is offered, because KOPRA has not announced either.
- Reservations are **requests** with a `pending` status; the UI never claims a table is confirmed.
- Photography is representative (licensed Unsplash imagery) and labelled as such on the gallery page. Replace it from the admin panel with KOPRA's own shoot.

---

## Project structure

```
app/
  (site)/            public routes, sharing header/footer
  admin/             protected dashboard + server actions
  api/               reservation & enquiry endpoints
components/
  site/              nav, footer, reveals, parallax, tilt, marquee
  three/             R3F scene + WebGL detection/fallback
  menu/ events/ gallery/ forms/ admin/
lib/
  business.ts        verified business facts
  content.ts         editorial copy, reviews, FAQs
  db.ts              schema, seed, queries, mutations
  auth.ts            admin session
  validation.ts      shared form validation + rate limiting
  uploads.ts         image storage
data/                SQLite database (git-ignored)
public/uploads/      uploaded images (git-ignored)
```

---

## Deployment

The app needs **a Node.js server with a persistent disk** — for the SQLite database and uploaded images.

### Any Node host (recommended for this build)

1. Provision a host with Node 24+ and a persistent volume — Render, Railway, Fly.io, a VPS, or similar.
2. Set the environment variables above. Point `KOPRA_DB_PATH` at the mounted volume (e.g. `/var/data/kopra.db`).
3. Build and run:

   ```bash
   npm ci
   npm run build
   npm start          # binds 0.0.0.0:3000
   ```

4. Put Nginx/Caddy in front for HTTPS and your domain, proxy to `127.0.0.1:3000`.
5. Back up `data/kopra.db` (or the volume) on a schedule — it holds every reservation and enquiry.

With systemd, a minimal unit:

```ini
[Service]
WorkingDirectory=/srv/kopra
ExecStart=/usr/bin/npm start
Environment=NODE_ENV=production
EnvironmentFile=/srv/kopra/.env
Restart=always
```

### Vercel / serverless

The public pages deploy fine, but **SQLite writes and local uploads do not persist** on serverless filesystems. To deploy there, swap `lib/db.ts` for a hosted Postgres (Neon/Supabase) using Prisma or Drizzle, and `lib/uploads.ts` for object storage (S3/R2). The data layer is isolated in those two files to make that a contained change.

### Image uploads

Uploads are written to `public/uploads/`. On a single host this is served directly by Next. For multi-instance deployments, replace `lib/uploads.ts` with S3/R2 and store the public URL.

---

## Testing

```bash
npx tsc --noEmit   # type safety
npm run build      # production build
```

Manual checks worth repeating after content changes:

- Submit a reservation → appears in `/admin/reservations` as `pending`.
- Submit a private event enquiry → appears in `/admin/enquiries`.
- Change a price in `/admin/menu` → the public menu updates.
- Sign out → `/admin` redirects to `/admin/login`.
- Enable “reduce motion” in the OS → the 3D hero and reveals settle without animation.

---

## Credits

- Concept, menu and story: KOPRA. Sources listed in `docs/BUSINESS-DATA.md`.
- Photography: Unsplash (representative placeholder imagery, licensed under the Unsplash License). Replace with KOPRA's own photography.
- Typefaces: Fraunces and Manrope via Google Fonts.

---

© KOPRA. Built as a bespoke site; no template was used.
