create table if not exists public.site_content (
  id text primary key default 'main',
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
  on public.site_content
  for select
  using (id = 'main');

drop policy if exists "Authenticated owner can edit site content" on public.site_content;
create policy "Authenticated owner can edit site content"
  on public.site_content
  for all
  to authenticated
  using (id = 'main')
  with check (id = 'main');

create or replace function public.touch_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_site_content_updated_at on public.site_content;

create trigger touch_site_content_updated_at
before update on public.site_content
for each row execute function public.touch_site_content_updated_at();

insert into public.site_content (id, content)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can read site media" on storage.objects;
create policy "Public can read site media"
  on storage.objects
  for select
  using (bucket_id = 'site-media');

drop policy if exists "Authenticated owner can upload site media" on storage.objects;
create policy "Authenticated owner can upload site media"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'site-media');

drop policy if exists "Authenticated owner can update site media" on storage.objects;
create policy "Authenticated owner can update site media"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'site-media')
  with check (bucket_id = 'site-media');

drop policy if exists "Authenticated owner can delete site media" on storage.objects;
create policy "Authenticated owner can delete site media"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'site-media');
