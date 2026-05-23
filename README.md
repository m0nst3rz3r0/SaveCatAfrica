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

## Deploy frontend to Vercel

Vercel hosts the **static React app only**. Convex (database, API, Stripe webhook) stays on [Convex Cloud](https://convex.dev).

### 1. Deploy Convex to production

```bash
npx convex deploy
```

Note the **production** deployment URL (e.g. `https://happy-animal-123.convex.cloud`). Set secrets in the Convex dashboard for the **production** deployment:

- `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

Point your Stripe webhook at:

```
https://<your-prod-deployment>.convex.site/stripe-webhook
```

### 2. Connect the GitHub repo on Vercel

1. Import [github.com/m0nst3rz3r0/savecat](https://github.com/m0nst3rz3r0/savecat) in the Vercel dashboard.
2. Framework preset: **Vite** (or use the included `vercel.json`).
3. Build command: `npm run build`
4. Output directory: `dist`

### 3. Environment variable on Vercel

| Name | Value |
|------|--------|
| `VITE_CONVEX_URL` | Your **production** Convex URL from step 1 |

Redeploy after adding the variable so the build picks it up.

### 4. Custom domain (optional)

Add your domain in Vercel → Settings → Domains. Stripe checkout success/cancel URLs use `window.location.origin`, so they will match your Vercel URL automatically.

### What runs where

| Service | Host |
|---------|------|
| React site (`/`, `/admin`, `/p/*`) | Vercel |
| Database, mutations, admin auth | Convex |
| Stripe Checkout + webhook | Convex HTTP action |

Local dev still uses `npm run dev` (Convex dev + Vite). Production frontend on Vercel talks to production Convex via `VITE_CONVEX_URL`.
