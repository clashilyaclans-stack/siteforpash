create table if not exists public.site_v2_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_v2_content enable row level security;

drop policy if exists "site_v2_content_read_all" on public.site_v2_content;
create policy "site_v2_content_read_all"
on public.site_v2_content
for select
using (true);

insert into public.site_v2_content (id, content)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;
