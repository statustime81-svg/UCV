# UCV website — Vercel deployment

## Project settings

Import this repository into Vercel and keep the project settings on **Other** (the included `vercel.json` does this). Use:

- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm run build`
- Output directory: leave blank; Nitro creates Vercel's `.vercel/output` deployment bundle.
- Node.js: 22 or newer (the Nitro Vercel function is built for Node 24).

Do not select `.next`, `dist`, or `build` as the output directory. This project uses vinext with Nitro's Vercel preset, not Next.js's default Vercel builder.

## Vercel environment variables

In **Project → Settings → Environment Variables**, add the production values below. Add Preview values too if preview deployments should submit enquiries. Redeploy after changing variables.

| Variable | Value |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase public anon/publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase server-only service role key; mark sensitive and never expose in browser code |
| `EMAIL_API_KEY` | Resend API key for enquiry email notifications |
| `EMAIL_FROM` | Sender address verified with Resend |

`CMS_ADMIN_EMAILS` is optional and only applies to legacy CMS authentication. The enquiry inbox uses Supabase Auth and the `ucv_admins` table.

## Supabase setup

1. In Supabase SQL Editor, run `supabase/setup.sql`.
2. Create the administrator in **Authentication → Users**.
3. Copy that user's UUID and run `insert into public.ucv_admins(user_id) values ('USER-UUID');` in SQL Editor.
4. If changing enquiry contact status returns the setup warning, run `supabase/admin-enquiries-update.sql`.
5. Confirm the enquiry form saves a test entry and that it appears in `/admin` after signing in.

The service role key belongs only in Vercel's server environment and your local ignored `.env.local`. Never add it to GitHub, a screenshot, or a public issue.

## Local production build

```sh
pnpm install --frozen-lockfile
pnpm run build
pnpm run dev
```

`pnpm run dev` starts the local development server. `pnpm run build` generates `.vercel/output`, matching Vercel's deployment output. A successful local build verifies the source and bundling configuration; live submission/email checks still require valid Supabase and Resend environment variables.
