-- =========================================
-- Migration: 0004_rooms_messages_realtime.sql
-- =========================================

-- 1. Rooms
create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  is_private boolean default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- 2. Messages
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(trim(content)) > 0 and char_length(content) <= 2000),
  created_at timestamp with time zone default now()
);

create index idx_messages_room_id_created_at on public.messages(room_id, created_at);
create index idx_messages_user_id on public.messages(user_id);


-- =========================================
-- Row Level Security
-- =========================================

alter table public.rooms enable row level security;
alter table public.messages enable row level security;

-- Rooms: public rooms readable by everyone; private rooms not exposed via select for now
create policy "Public rooms are readable by everyone"
  on public.rooms for select
  using (is_private = false);

-- Authenticated users can create rooms (attributed to themselves)
create policy "Authenticated users can create rooms"
  on public.rooms for insert
  to authenticated
  with check (auth.uid() = created_by);

-- Messages: readable by anyone who can read the parent room
create policy "Messages are readable if the room is readable"
  on public.messages for select
  using (
    exists (
      select 1 from public.rooms
      where rooms.id = messages.room_id
      and rooms.is_private = false
    )
  );

-- Messages: authenticated users can insert as themselves, into non-private rooms
create policy "Authenticated users can send messages"
  on public.messages for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.rooms
      where rooms.id = messages.room_id
      and rooms.is_private = false
    )
  );

-- No update/delete policies — messages are immutable once sent (moderation
-- can happen via a service_role admin action later if you need it)


-- =========================================
-- Realtime configuration
-- =========================================

-- Add both tables to the supabase_realtime publication so clients can subscribe
alter publication supabase_realtime add table public.rooms;
alter publication supabase_realtime add table public.messages;

-- Ensure full row data is available on UPDATE/DELETE events too
-- (matters if you later support message edits/deletes)
alter table public.messages replica identity full;
alter table public.rooms replica identity full;
