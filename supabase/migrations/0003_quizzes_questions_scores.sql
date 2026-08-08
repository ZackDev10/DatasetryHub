-- =========================================
-- Migration: 0003_quizzes_questions_scores.sql
-- =========================================

-- 1. Quizzes — one quiz belongs to one tutorial
create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  tutorial_id uuid not null references public.tutorials(id) on delete cascade,
  title text not null,
  created_at timestamp with time zone default now()
);

create index idx_quizzes_tutorial_id on public.quizzes(tutorial_id);

-- 2. Questions — belong to a quiz
create table public.questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  question_text text not null,
  options jsonb not null,          -- e.g. '["Option A", "Option B", "Option C", "Option D"]'
  correct_answer text not null,
  created_at timestamp with time zone default now(),

  -- Guard rail: ensure `options` is actually a JSON array, not an object/string/number
  constraint options_is_array check (jsonb_typeof(options) = 'array')
);

create index idx_questions_quiz_id on public.questions(quiz_id);

-- 3. User scores — one row per user attempt per quiz
create table public.user_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  score int4 not null,
  created_at timestamp with time zone default now()
);

create index idx_user_scores_user_id on public.user_scores(user_id);
create index idx_user_scores_quiz_id on public.user_scores(quiz_id);


-- =========================================
-- Row Level Security
-- =========================================

alter table public.quizzes enable row level security;
alter table public.questions enable row level security;
alter table public.user_scores enable row level security;

-- Quizzes: readable by everyone (including anon), no client-side writes
create policy "Quizzes are readable by everyone"
  on public.quizzes for select
  using (true);

-- Questions: readable by everyone
create policy "Questions are readable by everyone"
  on public.questions for select
  using (true);

-- User scores: users can only read their own rows
create policy "Users can read their own scores"
  on public.user_scores for select
  using (auth.uid() = user_id);

-- User scores: users can only insert rows as themselves
create policy "Users can insert their own scores"
  on public.user_scores for insert
  with check (auth.uid() = user_id);
