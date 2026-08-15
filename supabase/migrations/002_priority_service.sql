-- Adds the client's priority service for Ozi Membership bookings.
-- Run this in the Supabase SQL editor if you already created the tables.

alter table public.bookings
  add column if not exists priority_service text;
