# SaveCat Africa — Production setup (Convex + Vercel)

**GitHub repo:** https://github.com/m0nst3rz3r0/SaveCatAfrica

## Overview

| Service | Hosts |
|---------|--------|
| React frontend | **Vercel** |
| Database, API, admin auth | **Convex Cloud** |
| Stripe checkout + webhook | **Convex HTTP action** |

---

## Step 1: Convex Cloud (production backend)

Local anonymous Convex (`127.0.0.1`) is for dev only. Vercel needs a **cloud** deployment URL.

### 1a. Log in and create a cloud project

```bash
npm install
npx convex login
npx convex dev
```

On first cloud login, choose **Create a new project** (e.g. `savecat-africa`). This updates `.env.local` with a URL like:

```
VITE_CONVEX_URL=https://your-project-123.convex.cloud
```

Press `Ctrl+C` after it connects.

### 1b. Deploy backend to production

```bash
npx convex deploy
```

Copy the **production** URL printed (e.g. `https://happy-animal-123.convex.cloud`). You will use this on Vercel.

### 1c. Set Convex environment variables

Open the [Convex dashboard](https://dashboard.convex.dev) → your project → **Settings → Environment Variables** (Production):

| Variable | Example | Purpose |
|----------|---------|---------|
| `ADMIN_EMAIL` | `admin@savecatafrica.org` | Admin login |
| `ADMIN_PASSWORD` | *(strong password)* | Admin login |
| `STRIPE_SECRET_KEY` | `sk_test_...` or `sk_live_...` | Stripe Checkout |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Stripe webhook verification |

### 1d. Stripe webhook

In Stripe Dashboard → **Developers → Webhooks**, add endpoint:

```
https://<your-prod-deployment-name>.convex.site/stripe-webhook
```

Find your exact `.convex.site` URL in Convex dashboard → **Settings → URL & Deploy Key**.

Event to listen for: **`checkout.session.completed`**

---

## Step 2: Vercel (frontend)

### 2a. Import the repo

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **m0nst3rz3r0/SaveCatAfrica**
3. Framework: **Vite** (auto-detected via `vercel.json`)
4. Build command: `npm run build`
5. Output directory: `dist`

### 2b. Environment variable (required)

In Vercel → Project → **Settings → Environment Variables**:

| Name | Value | Environments |
|------|-------|--------------|
| `VITE_CONVEX_URL` | `https://your-project-123.convex.cloud` | Production, Preview, Development |

Use the **production** URL from `npx convex deploy` (Step 1b), not the local `127.0.0.1` URL.

### 2c. Deploy

Click **Deploy**. After build completes, open your Vercel URL.

### 2d. Seed the site (first time)

1. Visit `https://your-app.vercel.app/admin/login`
2. Sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from Convex env vars
3. Click **Seed Database** on the dashboard

---

## Step 3: Verify

- [ ] Public site loads sections (after seed)
- [ ] `/admin` login works
- [ ] Contact form saves to admin inbox
- [ ] Donate button opens Stripe Checkout (test mode)
- [ ] After test payment, donation appears in `/admin/donations`

---

## Local development

```bash
npm run dev
```

Runs Convex dev + Vite on port 3000. Uses `.env.local` (not committed).

---

## Troubleshooting

**Yellow “Setup required” banner on site**  
`VITE_CONVEX_URL` is missing at build time. Add it in Vercel env vars and redeploy.

**Admin login fails**  
Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in Convex dashboard (Production deployment).

**Donations don’t appear**  
Confirm Stripe webhook URL uses `.convex.site` (not `.convex.cloud`) and `STRIPE_WEBHOOK_SECRET` matches Stripe.

**Empty site sections**  
Run **Seed Database** from `/admin` dashboard once.
