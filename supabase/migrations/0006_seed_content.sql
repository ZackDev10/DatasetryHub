-- =========================================
-- Migration: 0006_seed_content.sql
-- =========================================
-- Seeds the 'Data Analysis' and 'Data Engineering' tracks with
-- 2 projects and 2 tutorials each so the /explore page has content.
-- All inserts use WHERE NOT EXISTS guards so the script is idempotent.

-- ───── Tracks ─────

insert into public.tracks (name, slug, description)
select 'Data Analysis', 'data-analysis', 'Learn to collect, clean, explore, and visualize data to uncover actionable insights.'
where not exists (select 1 from public.tracks where slug = 'data-analysis');

insert into public.tracks (name, slug, description)
select 'Data Engineering', 'data-engineering', 'Design, build, and maintain robust data pipelines and infrastructure at scale.'
where not exists (select 1 from public.tracks where slug = 'data-engineering');

-- ───── Projects ─────

-- Data Analysis projects
insert into public.projects (track_id, title, slug, description, difficulty, is_published)
select
    t.id, 'Sales Dashboard with Python', 'sales-dashboard-python',
    'Build an interactive sales dashboard using Pandas, Plotly, and Dash. Clean real-world CSV data and visualize KPIs.',
    'intermediate', true
from public.tracks t where t.slug = 'data-analysis'
and not exists (select 1 from public.projects where slug = 'sales-dashboard-python');

insert into public.projects (track_id, title, slug, description, difficulty, is_published)
select
    t.id, 'Customer Segmentation Analysis', 'customer-segmentation',
    'Apply K-Means clustering to segment customers based on purchasing behavior. Present findings with clear visualizations.',
    'advanced', true
from public.tracks t where t.slug = 'data-analysis'
and not exists (select 1 from public.projects where slug = 'customer-segmentation');

-- Data Engineering projects
insert into public.projects (track_id, title, slug, description, difficulty, is_published)
select
    t.id, 'ELT Pipeline with dbt & BigQuery', 'elt-pipeline-dbt-bigquery',
    'Build a production-grade ELT pipeline using dbt for transformations and BigQuery as the warehouse. Implement tests and documentation.',
    'advanced', true
from public.tracks t where t.slug = 'data-engineering'
and not exists (select 1 from public.projects where slug = 'elt-pipeline-dbt-bigquery');

insert into public.projects (track_id, title, slug, description, difficulty, is_published)
select
    t.id, 'Real-time Streaming with Kafka', 'real-time-kafka-streaming',
    'Set up Apache Kafka to ingest and process real-time event streams. Build a simple consumer that writes to PostgreSQL.',
    'intermediate', true
from public.tracks t where t.slug = 'data-engineering'
and not exists (select 1 from public.projects where slug = 'real-time-kafka-streaming');

-- ───── Tutorials ─────

-- Data Analysis tutorials
insert into public.tutorials (track_id, title, slug, description, difficulty, estimated_minutes, is_published)
select
    t.id, 'Pandas Fundamentals', 'pandas-fundamentals',
    'Master DataFrames, filtering, grouping, and joins with Pandas. Work through hands-on exercises with real datasets.',
    'beginner', 45, true
from public.tracks t where t.slug = 'data-analysis'
and not exists (select 1 from public.tutorials where slug = 'pandas-fundamentals');

insert into public.tutorials (track_id, title, slug, description, difficulty, estimated_minutes, is_published)
select
    t.id, 'Data Visualization with Matplotlib', 'matplotlib-visualization',
    'Create publication-quality charts and plots. Learn line plots, bar charts, histograms, and heatmaps.',
    'beginner', 35, true
from public.tracks t where t.slug = 'data-analysis'
and not exists (select 1 from public.tutorials where slug = 'matplotlib-visualization');

-- Data Engineering tutorials
insert into public.tutorials (track_id, title, slug, description, difficulty, estimated_minutes, is_published)
select
    t.id, 'Introduction to Docker for Data Engineers', 'intro-docker-data-engineering',
    'Containerize data applications with Docker. Learn to write Dockerfiles, use docker-compose, and manage volumes.',
    'beginner', 40, true
from public.tracks t where t.slug = 'data-engineering'
and not exists (select 1 from public.tutorials where slug = 'intro-docker-data-engineering');

insert into public.tutorials (track_id, title, slug, description, difficulty, estimated_minutes, is_published)
select
    t.id, 'SQL for Analytics', 'sql-for-analytics',
    'Go beyond basic queries — use window functions, CTEs, and aggregations to answer complex business questions.',
    'intermediate', 50, true
from public.tracks t where t.slug = 'data-engineering'
and not exists (select 1 from public.tutorials where slug = 'sql-for-analytics');
