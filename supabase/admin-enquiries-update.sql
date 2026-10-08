-- Run once in your existing UCV Supabase project's SQL Editor.
-- Existing enquiry data is preserved. New and existing enquiries start as not contacted.
alter table public.partner_enquiries
    add column if not exists contacted boolean not null default false;
-- Writes are performed only by the server after verifying Supabase login and ucv_admins membership.
-- No browser update/delete grants or public write policies are needed.
grant select, update, delete on public.partner_enquiries to service_role;
notify pgrst, 'reload schema';
