# UCV: enquiry-only admin and Supabase setup

The public website content is now edited in source files. `/admin` is an enquiry inbox only. It does not upload images or edit website copy.

## Connect your own Supabase project

1. Create a Supabase project under the client's account. Keep the project and hosting administrator access under their control.
2. Run `supabase/setup.sql` in the project's SQL Editor.
3. In Authentication → Users, create an administrator user with your chosen email and a strong password. Use the confirmed user option. Do not enable public sign-up for this admin-only application.
4. Copy that user's UUID and run:

```sql
insert into public.ucv_admins(user_id) values ('YOUR_ACTUAL_USER_UUID');
```

5. Copy `.env.example` to `.env`. Fill in:

```dotenv
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_OR_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
```

6. Set the same values in the deployed hosting environment. A local `.env` does not configure a hosted site. Restart your local server after changing the file.
7. Open `/admin` and sign in with the email and password you created. There is no built-in shared password. Sessions are held in memory and cleared when you reload or sign out.
8. Submit a test enquiry from `/partner`. Check that it appears both in the inbox and in Supabase `partner_enquiries`. Sign out and verify an unauthenticated request cannot read enquiries. A signed-in user absent from `ucv_admins` must also be unable to read them.

## Data and security

- The public form calls the website's server endpoint. Server validation, honeypot, timing checks and a shared hourly rate limit run before saving.
- The service role key stays on the server. Never put it into a `NEXT_PUBLIC_*` variable or send it to the browser.
- Admin sign-in uses Supabase Auth; the browser receives only the public key and a user session. RLS allows enquiry reads only to UUIDs in `ucv_admins`. Anonymous users cannot insert or read directly.
- The inbox shows the latest 100 enquiries. It has refresh and sign-out controls. More/older records remain in Supabase.
- While Supabase is unconfigured, this Sites preview keeps saving to the existing D1 database. `/admin` labels this state and exposes a separate owner-authorised preview inbox. Existing enquiries are not deleted or silently migrated. Export/migrate historical enquiries separately before retiring D1.
- Once Supabase URL and server key are configured, Supabase failures return a recoverable submission error rather than silently writing to another database. Make sure all three settings and the SQL are installed together.
- Code is prepared and checked, but live Supabase login and saving cannot be tested until your project keys and account exist.

## Optional email notification

`EMAIL_API_KEY` and `EMAIL_FROM` configure the existing Resend email notification. Use a verified sending domain. Enquiry storage works independently of notification. The response reports receipt after a successful save and only reports email delivery acceptance when the service accepts the send.

## Before public launch

Replace concept imagery and captions with approved assets. Confirm the legal company name, full address and representative in `src/content/cms.ts`, and finalise privacy disclosures, Supabase hosting region, provider agreements and retention periods. Legal text is still a draft. Finalise the purchased domain separately.

The source uses HTTP Supabase APIs and works with the current Cloudflare Worker runtime. The prepared `.env` has empty values and is intentionally excluded from source downloads; `.env.example` is included.

## Current admin: compact enquiry management

The admin panel shows 25 compact enquiry rows per page, with Previous/Next navigation. Click a row to read the full message and contact details. In the details popup, select Not contacted or Contacted; the value is saved in the database. Delete requires explicit confirmation and permanently removes only that enquiry.

For an existing Supabase project, run `supabase/admin-enquiries-update.sql` once in SQL Editor before using contact status. It adds a boolean contacted column without deleting any enquiry. Fresh installs may run the updated full setup.sql instead.

The browser calls /api/admin/enquiries. Every request verifies the signed-in Supabase user and ucv_admins membership before server-only service-role access. Mutations require same-origin JSON requests and validate the enquiry UUID and status. Do not add anonymous or general authenticated UPDATE/DELETE policies. The existing preview inbox supports the same workflow using its authorised owner session and existing D1 records.

A session refresh is attempted when a Supabase access token expires. No passwords or service-role keys are stored in the browser.

Gallery management remains disabled; public gallery content and previous photographs remain available.

After deployment: sign in, submit a test enquiry, open its details, set Contacted, reload and sign in again to verify persistence, then delete only that test enquiry using the confirmation dialog. Signed-out and non-admin accounts must not read, update or delete enquiries. Live checks against your own Supabase require your configured hosting environment.
