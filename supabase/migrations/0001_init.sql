-- ============================================================
-- Migration initiale : Admin Sophie Jacquet-Audebert
-- ============================================================

-- ---------- EXTENSIONS ----------
create extension if not exists "pgcrypto";

-- ---------- TABLE: articles ----------
create table if not exists public.articles (
  id          bigint generated always as identity primary key,
  category    text not null,
  title       text not null,
  subtitle    text,
  text        text not null,
  tags        text[] not null default '{}',
  info        text,
  status      text not null default 'Sur demande',
  icon        text default '◇',
  published   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------- TABLE: contacts (formulaire de contact) ----------
create table if not exists public.contacts (
  id            uuid primary key default gen_random_uuid(),
  prenom        text not null,
  nom           text not null,
  email         text not null,
  telephone     text,
  motif         text not null,
  source        text,           -- "Comment avez-vous entendu parler de moi ?"
  message       text not null,
  is_read       boolean not null default false,
  is_archived   boolean not null default false,
  created_at    timestamptz not null default now()
);

-- ---------- TABLE: appointments (prises de rendez-vous) ----------
create table if not exists public.appointments (
  id            uuid primary key default gen_random_uuid(),
  date          date not null,
  heure         time not null,
  motif         text not null,
  nom           text not null,
  prenom        text not null,
  email         text not null,
  telephone     text,
  status        text not null default 'En attente', -- En attente / Confirmé / Annulé
  notes         text,
  created_at    timestamptz not null default now()
);

-- ---------- TABLE: settings (palette + email notifs) ----------
create table if not exists public.settings (
  id                  int primary key default 1,
  palette             text not null default 'cosmic',
  notify_email        text,
  notify_on_contact   boolean not null default true,
  notify_on_appointment boolean not null default true,
  updated_at          timestamptz not null default now(),
  constraint settings_singleton check (id = 1)
);

insert into public.settings (id, palette, notify_email)
values (1, 'cosmic', null)
on conflict (id) do nothing;

-- ---------- updated_at triggers ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_articles_updated_at on public.articles;
create trigger trg_articles_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

drop trigger if exists trg_settings_updated_at on public.settings;
create trigger trg_settings_updated_at
  before update on public.settings
  for each row execute function public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.articles     enable row level security;
alter table public.contacts     enable row level security;
alter table public.appointments enable row level security;
alter table public.settings     enable row level security;

-- ARTICLES : lecture publique des articles publiés, écriture admin uniquement
drop policy if exists "public read published articles" on public.articles;
create policy "public read published articles"
  on public.articles for select
  using (published = true);

drop policy if exists "admin full access articles" on public.articles;
create policy "admin full access articles"
  on public.articles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- CONTACTS : insertion publique (formulaire), lecture/maj réservées admin
drop policy if exists "public insert contacts" on public.contacts;
create policy "public insert contacts"
  on public.contacts for insert
  with check (true);

drop policy if exists "admin read contacts" on public.contacts;
create policy "admin read contacts"
  on public.contacts for select
  using (auth.role() = 'authenticated');

drop policy if exists "admin update contacts" on public.contacts;
create policy "admin update contacts"
  on public.contacts for update
  using (auth.role() = 'authenticated');

drop policy if exists "admin delete contacts" on public.contacts;
create policy "admin delete contacts"
  on public.contacts for delete
  using (auth.role() = 'authenticated');

-- APPOINTMENTS : insertion publique (prise de RDV), lecture/maj réservées admin
drop policy if exists "public insert appointments" on public.appointments;
create policy "public insert appointments"
  on public.appointments for insert
  with check (true);

drop policy if exists "admin read appointments" on public.appointments;
create policy "admin read appointments"
  on public.appointments for select
  using (auth.role() = 'authenticated');

drop policy if exists "admin update appointments" on public.appointments;
create policy "admin update appointments"
  on public.appointments for update
  using (auth.role() = 'authenticated');

drop policy if exists "admin delete appointments" on public.appointments;
create policy "admin delete appointments"
  on public.appointments for delete
  using (auth.role() = 'authenticated');

-- SETTINGS : lecture publique (palette utilisée par le site public), écriture admin
drop policy if exists "public read settings" on public.settings;
create policy "public read settings"
  on public.settings for select
  using (true);

drop policy if exists "admin update settings" on public.settings;
create policy "admin update settings"
  on public.settings for update
  using (auth.role() = 'authenticated');

-- ---------- Index utiles ----------
create index if not exists idx_contacts_created_at on public.contacts (created_at desc);
create index if not exists idx_contacts_is_read on public.contacts (is_read);
create index if not exists idx_appointments_date on public.appointments (date, heure);
create index if not exists idx_appointments_status on public.appointments (status);
create index if not exists idx_articles_sort on public.articles (sort_order);
