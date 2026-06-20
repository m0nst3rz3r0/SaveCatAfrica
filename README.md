# SaveCat Africa

Nonprofit landing site for cat rescue across Africa, with a Convex backend, Stripe donations, and an admin dashboard.

**Repository:** https://github.com/m0nst3rz3r0/SaveCatAfrica

## Quick start (local)

```bash
npm install
npx convex login    # first time only — links to Convex Cloud
npm run dev         # Convex + Vite on http://localhost:3000
```

Open `/admin`, sign in (default until you set Convex env vars: `admin@savecatafrica.org` / `changeme`), then **Seed Database**.

## Production deploy

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full Convex + Vercel + Stripe setup checklist.

Summary:

1. `npx convex deploy` → copy production `VITE_CONVEX_URL`
2. Set Convex env vars (`ADMIN_*`, `STRIPE_*`)
3. Import repo on Vercel, add `VITE_CONVEX_URL`, deploy
4. Seed database from `/admin`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Convex dev + Vite |
| `npm run build` | Production frontend build |
| `npm run convex:deploy` | Deploy backend to Convex Cloud |
| `npm run lint` | TypeScript check |

## Admin routes

- `/admin` — dashboard
- `/admin/settings` — site copy and goals
- `/admin/impact` — footer stats (empty = hidden)
- `/admin/donations` — Stripe donation log
- `/admin/contacts`, `/admin/newsletter` — submissions

Public CMS pages: `/p/:slug`
