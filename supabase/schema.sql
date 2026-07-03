-- ============================================================
-- Zigam — Supabase schema (Phase 1: bookings + payments)
-- Run this in the Supabase SQL editor.
-- ============================================================

create extension if not exists "pgcrypto";

-- Customers ---------------------------------------------------
create table if not exists public.customers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  created_at  timestamptz not null default now(),
  unique (email)
);

-- Bookings ----------------------------------------------------
create table if not exists public.bookings (
  id                  uuid primary key default gen_random_uuid(),
  customer_id         uuid references public.customers(id) on delete set null,
  -- who
  name                text not null,
  email               text not null,
  phone               text,
  -- what
  booking_type        text not null check (booking_type in ('one_time','subscription')),
  location            text not null check (location in ('enugu','lagos')),
  service             text,               -- one_time service id
  ozi_plan            text,               -- subscription plan name
  bedrooms            text,               -- for deep cleaning / move in-out
  -- when
  service_date        date,
  time_slot           text,               -- 'standard' | 'off_hours'
  -- details
  address             text,
  access_instructions text,
  has_pets            boolean default false,
  add_ons             jsonb default '[]'::jsonb,
  assurance           boolean default false,
  upfront_6_months    boolean default false,
  terms_accepted      boolean not null default false,
  notes               text,
  -- money (Naira)
  base_amount         integer not null default 0,
  surcharge_amount    integer not null default 0,
  assurance_amount    integer not null default 0,
  discount_amount     integer not null default 0,
  total_amount        integer not null default 0,
  is_quote            boolean not null default false,
  -- payment
  status              text not null default 'pending'
                        check (status in ('pending','paid','quote_requested','failed','cancelled')),
  paystack_reference  text unique,
  created_at          timestamptz not null default now()
);

create index if not exists bookings_email_idx on public.bookings (email);
create index if not exists bookings_status_idx on public.bookings (status);

-- Row Level Security -----------------------------------------
-- Writes/reads happen through the server using the service-role key,
-- which bypasses RLS. We enable RLS and add no public policies so the
-- anon key cannot read or write these tables directly.
alter table public.customers enable row level security;
alter table public.bookings  enable row level security;
