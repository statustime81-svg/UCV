-- Run once in Supabase SQL Editor. No anonymous reads or writes.
create table if not exists public.partner_enquiries (
 id uuid primary key default gen_random_uuid(), name text not null, restaurant text not null,
 email text not null, phone text, city text not null, brand text, message text not null,
 lang text, consent boolean not null default true, created_at timestamptz not null default now()
);
create index if not exists enquiries_created_at on public.partner_enquiries(created_at desc);
create table if not exists public.ucv_admins(user_id uuid primary key references auth.users(id) on delete cascade);
create table if not exists public.enquiry_rate_limits(bucket text primary key, count integer not null, expires_at timestamptz not null);
alter table public.partner_enquiries enable row level security;
alter table public.ucv_admins enable row level security;
alter table public.enquiry_rate_limits enable row level security;
revoke all on public.partner_enquiries,public.ucv_admins,public.enquiry_rate_limits from anon,authenticated;
grant select on public.ucv_admins,public.partner_enquiries to authenticated;
grant all on public.partner_enquiries,public.ucv_admins,public.enquiry_rate_limits to service_role;
drop policy if exists "own admin membership" on public.ucv_admins;
create policy "own admin membership" on public.ucv_admins for select to authenticated using(user_id=auth.uid());
drop policy if exists "admins read enquiries" on public.partner_enquiries;
create policy "admins read enquiries" on public.partner_enquiries for select to authenticated using(exists(select 1 from public.ucv_admins where user_id=auth.uid()));
create or replace function public.consume_enquiry_rate(p_bucket text,p_expires timestamptz) returns boolean language plpgsql security definer set search_path=public as $$
declare attempts integer;
begin
 delete from public.enquiry_rate_limits where expires_at<now();
 insert into public.enquiry_rate_limits(bucket,count,expires_at) values(p_bucket,1,p_expires)
 on conflict(bucket) do update set count=enquiry_rate_limits.count+1 returning count into attempts;
 return attempts<=5;
end; $$;
revoke all on function public.consume_enquiry_rate(text,timestamptz) from public,anon,authenticated;
grant execute on function public.consume_enquiry_rate(text,timestamptz) to service_role;
-- After creating an Auth user, add the actual UUID below:
-- insert into public.ucv_admins(user_id) values ('YOUR_ADMIN_USER_UUID');

-- Public website gallery. Writes go through the admin-verified server endpoint.
create table if not exists public.gallery_images (
 id uuid primary key, src text not null, de text not null, en text not null,
 category text not null check (category in ('food','spaces','people')),
 storage_key text not null, created_at timestamptz not null default now()
);
alter table public.gallery_images enable row level security;
revoke all on public.gallery_images from anon,authenticated;
grant all on public.gallery_images to service_role;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('ucv-gallery','ucv-gallery',true,6291456,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=true,file_size_limit=6291456,allowed_mime_types=excluded.allowed_mime_types;
-- This public bucket is only for approved website photographs, never private documents.
-- No anonymous/authenticated write policies are granted for this bucket.
-- Run once in your existing UCV Supabase project's SQL Editor.
-- Existing enquiry data is preserved. New and existing enquiries start as not contacted.
alter table public.partner_enquiries
    add column if not exists contacted boolean not null default false;
-- Writes are performed only by the server after verifying Supabase login and ucv_admins membership.
-- No browser update/delete grants or public write policies are needed.
grant select, update, delete on public.partner_enquiries to service_role;
notify pgrst, 'reload schema';
