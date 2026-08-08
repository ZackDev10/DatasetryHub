// src/app/explore/page.tsx
import { createClient } from '@/utils/supabase/server'
import { TrackFilterExplorer } from '@/components/content/track-filter-explorer'
import Link from 'next/link'

export default async function ExplorePage() {
    const supabase = await createClient()

    const [{ data: tracks }, { data: projects }, { data: tutorials }] = await Promise.all([
        supabase.from('tracks').select('id, name, slug, description').order('name'),
        supabase
            .from('projects')
            .select('id, track_id, title, slug, description, difficulty, thumbnail_url, repo_url, demo_url')
            .eq('is_published', true)
            .order('created_at', { ascending: false }),
        supabase
            .from('tutorials')
            .select('id, track_id, title, slug, description, difficulty, estimated_minutes, thumbnail_url')
            .eq('is_published', true)
            .order('created_at', { ascending: false }),
    ])

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-10">
                <Link
                    href="/dashboard"
                    className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Explore</h1>
                <p className="mt-2 text-base text-slate-500">
                    Projects and tutorials curated for every skill level.
                </p>
            </div>

            <TrackFilterExplorer
                tracks={tracks ?? []}
                initialProjects={projects ?? []}
                initialTutorials={tutorials ?? []}
            />
        </div>
    )
}
