create table public.snippets (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  title       text not null default 'Untitled',
  language_id integer not null,
  code        text not null,
  is_public   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.snippets enable row level security;

create policy "Users manage own snippets"
  on public.snippets for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Anyone reads public snippets"
  on public.snippets for select
  using (is_public = true);

create index snippets_user_id_idx on public.snippets (user_id);
create index snippets_created_at_idx on public.snippets (created_at desc);
