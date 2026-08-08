-- =========================================
-- Migration: 0005_seed_global_room.sql
-- =========================================
-- Seeds the default "Global" chat room.
-- Uses INSERT ... WHERE NOT EXISTS so it's idempotent (safe to re-run).

insert into public.rooms (name, description, is_private)
select 'Global', 'General discussion for everyone.', false
where not exists (select 1 from public.rooms where name = 'Global');
