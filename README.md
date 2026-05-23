# SaveCat Africa

Nonprofit landing site for cat rescue across Africa, with a Convex backend, Stripe donations, and an admin dashboard.

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start Convex and Vite together:

   ```bash
   npm run dev
   ```

   On first run, follow the Convex CLI prompts to create/link a project. Copy `VITE_CONVEX_URL` from the generated `.env.local` into your environment.

3. Set Convex dashboard secrets (Settings → Environment Variables):

   - `ADMIN_EMAIL` — admin login email
   - `ADMIN_PASSWORD` — admin login password
   - `STRIPE_SECRET_KEY` — Stripe secret key (test mode for development)
   - `STRIPE_WEBHOOK_SECRET` — from Stripe webhook pointing to your Convex HTTP URL

4. Open [http://localhost:3000/admin](http://localhost:3000/admin), sign in, and click **Seed Database** on the dashboard.

## Stripe webhook

In the Convex dashboard, find your HTTP actions URL and register in Stripe:

```
https://<your-deployment>.convex.site/stripe-webhook
```

Event: `checkout.session.completed`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Convex + Vite dev servers |
| `npm run build` | Production frontend build |
| `npm run lint` | TypeScript check |

## Admin routes

- `/admin` — dashboard overview
- `/admin/settings` — site copy, goals, contact info
- `/admin/impact` — footer impact stats (empty = hidden)
- `/admin/mission`, `/admin/protection`, `/admin/tiers` — content CRUD
- `/admin/donations` — Stripe donation log
- `/admin/contacts`, `/admin/newsletter` — form submissions

Public CMS pages live at `/p/:slug` (e.g. `/p/team`).
