# Deploying Zigam (Vercel)

Recommended host: **Vercel** — built for Next.js, free to start, auto-deploys on every git push.

## One-time setup

### 1. Put the code on GitHub
The project already has a git repo. Create an empty repo on GitHub (e.g. `zigam`), then:
```bash
cd ~/ProjectStudy/zigam
git add .
git commit -m "Zigam Next.js app — Phase 1"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/zigam.git
git push -u origin main
```
`.env.local`, `node_modules`, and `.next` are already git-ignored, so no secrets or bulk get pushed.

### 2. Import into Vercel
1. Go to **vercel.com**, sign up/in with GitHub.
2. **Add New → Project → Import** your `zigam` repo.
3. Framework preset auto-detects **Next.js**. Leave build settings as default (`next build`).
4. Before clicking Deploy, add your **Environment Variables** (next section).

### 3. Environment variables (Vercel → Project → Settings → Environment Variables)
Add each of these (same names as `.env.local`):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | from Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | from Supabase (keep secret) |
| `PAYSTACK_SECRET_KEY` | Paystack (test key first, live later) |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack |
| `NEXT_PUBLIC_SITE_URL` | your deployed URL, e.g. `https://zigam.vercel.app` |
| `NEXT_PUBLIC_COMING_SOON` | `true` to show only the launch page, else `false` |

Then click **Deploy**. In ~1–2 minutes you'll get a live URL.

## After the first deploy

1. **Set `NEXT_PUBLIC_SITE_URL` to the real URL** Vercel gave you (or your custom domain) and redeploy — this makes the Paystack payment redirect land back on the right site.
2. **Paystack dashboard:** the app builds its own callback URL from `NEXT_PUBLIC_SITE_URL`, so no per-transaction config is needed. When you add the webhook later (Phase 2), the URL will be `https://YOUR-DOMAIN/api/paystack/webhook`.
3. **Custom domain:** Vercel → Project → Settings → Domains → add `zigam.com` (or `.ng`) and follow the DNS instructions from your registrar.

## Going from test to live payments
1. Confirm the Assurance fee and Sunday surcharge in `src/lib/pricing.ts`.
2. Swap the Paystack **test** keys for **live** keys in Vercel's env vars.
3. Redeploy. Do one small real transaction to confirm settlement to your bank account.

## Updating the site later
Just push to `main` — Vercel rebuilds and redeploys automatically. Every pull request also gets its own preview URL.

## Alternatives
Netlify and Cloudflare Pages also host Next.js well; the steps are similar (connect repo, set env vars). Vercel is the smoothest for Next.js and is the recommended path.
