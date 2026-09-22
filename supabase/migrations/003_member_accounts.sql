-- ============================================================
-- 003 — Member accounts
-- Run in the Supabase SQL editor AFTER schema.sql and 002.
-- Enables: members reading their own bookings, pause requests
-- (1–3 weeks), service ratings, auto-renew preference, and an
-- assigned-associate field the admin can fill in.
-- ============================================================

-- Assigned associate (admin sets this; member sees it)
alter table public.bookings
  add column if not exists assigned_associate text;

-- ---------- Member can READ their own bookings ----------
-- Auth users are matched to bookings by verified email.
drop policy if exists "member reads own bookings" on public.bookings;
create policy "member reads own bookings"
  on public.bookings for select
  to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

-- ---------- Pause requests (memberships) ----------
create table if not exists public.subscription_pauses (
  id          uuid primary key default gen_random_uuid(),
  booking_id  uuid not null references public.bookings(id) on delete cascade,
  email       text not null,
  start_date  date not null,
  end_date    date not null,
  status      text not null default 'requested'
                check (status in ('requested','confirmed','completed','rejected')),
  created_at  timestamptz not null default now(),
  -- Terms: pause is 1 to 3 weeks
  constraint pause_length check (end_date - start_date between 7 and 21)
);

alter table public.subscription_pauses enable row level security;

drop policy if exists "member reads own pauses" on public.subscription_pauses;
create policy "member reads own pauses"
  on public.subscription_pauses for select
  to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

drop policy if exists "member requests pause on own booking" on public.subscription_pauses;
create policy "member requests pause on own booking"
  on public.subscription_pauses for insert
  to authenticated
  with check (
    lower(email) = lower(auth.jwt() ->> 'email')
    and exists (
      select 1 from public.bookings b
      where b.id = booking_id
        and lower(b.email) = lower(auth.jwt() ->> 'email')
        and b.booking_type = 'subscription'
    )
  );

-- ---------- Service ratings ----------
create table if not exists public.service_ratings (
  id          uuid primary key default gen_random_uuid(),
  booking_id  uuid not null references public.bookings(id) on delete cascade,
  email       text not null,
  stars       int not null check (stars between 1 and 5),
  comment     text,
  created_at  timestamptz not null default now(),
  unique (booking_id)
);

alter table public.service_ratings enable row level security;

drop policy if exists "member reads own ratings" on public.service_ratings;
create policy "member reads own ratings"
  on public.service_ratings for select
  to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

drop policy if exists "member rates own booking" on public.service_ratings;
create policy "member rates own booking"
  on public.service_ratings for insert
  to authenticated
  with check (
    lower(email) = lower(auth.jwt() ->> 'email')
    and exists (
      select 1 from public.bookings b
      where b.id = booking_id
        and lower(b.email) = lower(auth.jwt() ->> 'email')
    )
  );

-- ---------- Member preferences (auto-renew etc.) ----------
create table if not exists public.member_preferences (
  email       text primary key,
  auto_renew  boolean not null default true,
  updated_at  timestamptz not null default now()
);

alter table public.member_preferences enable row level security;

drop policy if exists "member reads own preferences" on public.member_preferences;
create policy "member reads own preferences"
  on public.member_preferences for select
  to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'));

drop policy if exists "member upserts own preferences" on public.member_preferences;
create policy "member upserts own preferences"
  on public.member_preferences for insert
  to authenticated
  with check (lower(email) = lower(auth.jwt() ->> 'email'));

drop policy if exists "member updates own preferences" on public.member_preferences;
create policy "member updates own preferences"
  on public.member_preferences for update
  to authenticated
  using (lower(email) = lower(auth.jwt() ->> 'email'))
  with check (lower(email) = lower(auth.jwt() ->> 'email'));
