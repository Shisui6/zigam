-- A Taste of Ozi becomes its own top-level booking type (was nested under one_time).
alter table public.bookings drop constraint if exists bookings_booking_type_check;
alter table public.bookings add constraint bookings_booking_type_check
  check (booking_type in ('one_time', 'subscription', 'taste_of_ozi'));

-- Preferred day(s) of the week for Ozi Membership subscriptions, matching the tier's cadence.
alter table public.bookings add column if not exists preferred_days text[];
