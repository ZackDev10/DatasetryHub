// src/components/content/track-filter-explorer.tsx
'use client'

import { getProjects, getTutorials, type Project, type Track, type Tutorial } from '@/utils/supabase/queries/content'
import { useEffect, useMemo, useState, useTransition } from 'react'

type ContentType = 'all' | 'projects' | 'tutorials'

export function TrackFilterExplorer({
    tracks,
    initialProjects,
    initialTutorials,
}: {
    tracks: Track[]
    initialProjects: Project[]
    initialTutorials: Tutorial[]
}) {
    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)
    const [contentType, setContentType] = useState<ContentType>('all')
    const [projects, setProjects] = useState<Project[]>(initialProjects)
    const [tutorials, setTutorials] = useState<Tutorial[]>(initialTutorials)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    // ---------- data fetching (unchanged) ----------

    useEffect(() => {
        setError(null)
        startTransition(async () => {
            try {
                const [projectsData, tutorialsData] = await Promise.all([
                    getProjects(selectedTrackId),
                    getTutorials(selectedTrackId),
                ])
                setProjects(projectsData)
                setTutorials(tutorialsData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load content')
            }
        })
    }, [selectedTrackId])

    const visibleProjects = useMemo(
        () => (contentType === 'tutorials' ? [] : projects),
        [contentType, projects]
    )
    const visibleTutorials = useMemo(
        () => (contentType === 'projects' ? [] : tutorials),
        [contentType, tutorials]
    )

    // ---------- render ----------

    return (
        <div className="w-full">
            {/* Filter bar: single horizontal row of pill-shaped buttons */}
            <div className="mb-5 flex items-center gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button
                    onClick={() => setSelectedTrackId(null)}
                    className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${selectedTrackId === null
                            ? 'bg-indigo-500 text-white shadow-md shadow-indigo-200'
                            : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                        }`}
                >
                    All
                </button>
                {tracks.map((track) => (
                    <button
                        key={track.id}
                        onClick={() => setSelectedTrackId(track.id)}
                        className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${selectedTrackId === track.id
                                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-200'
                                : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                            }`}
                    >
                        {track.name}
                    </button>
                ))}
            </div>

            {/* Content-type filter, styled as a secondary pill row to match the primary filter bar */}
            <div className="mb-8 flex items-center gap-2">
                {(['all', 'projects', 'tutorials'] as ContentType[]).map((type) => (
                    <button
                        key={type}
                        onClick={() => setContentType(type)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all ${contentType === type
                                ? 'bg-indigo-500 text-white shadow-sm shadow-indigo-200'
                                : 'border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className={isPending ? 'opacity-50 transition-opacity' : ''}>
                {visibleProjects.length > 0 && (
                    <section className="mb-10">
                        <h2 className="mb-5 text-xl font-semibold text-slate-900">Projects</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </section>
                )}

                {visibleTutorials.length > 0 && (
                    <section>
                        <h2 className="mb-5 text-xl font-semibold text-slate-900">Tutorials</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleTutorials.map((tutorial) => (
                                <TutorialCard key={tutorial.id} tutorial={tutorial} />
                            ))}
                        </div>
                    </section>
                )}

                {!isPending && visibleProjects.length === 0 && visibleTutorials.length === 0 && (
                    <div className="rounded-xl border border-slate-200 bg-white p-16 text-center shadow-md">
                        <p className="text-sm text-slate-400">No content found for this track yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

// ---------- shared card bits ----------

function TypeBadge({ label }: { label: 'Project' | 'Tutorial' }) {
    return (
        <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            {label}
        </span>
    )
}

function DifficultyBadge({ difficulty }: { difficulty: string | null }) {
    if (!difficulty) return null
    const colors: Record<string, string> = {
        beginner: 'bg-emerald-100 text-emerald-700',
        intermediate: 'bg-amber-100 text-amber-700',
        advanced: 'bg-rose-100 text-rose-700',
    }
    return (
        <span
            className={`absolute right-3 top-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize backdrop-blur-sm ${colors[difficulty] ?? 'bg-slate-100 text-slate-600'
                }`}
        >
            {difficulty}
        </span>
    )
}

function CardThumbnail({
    thumbnailUrl,
    alt,
    typeLabel,
    difficulty,
}: {
    thumbnailUrl: string | null
    alt: string
    typeLabel: 'Project' | 'Tutorial'
    difficulty: string | null
}) {
    return (
        <div className="relative h-40 w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-indigo-100 via-slate-100 to-slate-200">
            {thumbnailUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={thumbnailUrl} alt={alt} className="h-full w-full object-cover" />
            )}
            <TypeBadge label={typeLabel} />
            <DifficultyBadge difficulty={difficulty} />
        </div>
    )
}

function CtaButton({ label }: { label: string }) {
    return (
        <span className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all group-hover:bg-indigo-600">
            {label}
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
        </span>
    )
}

// ---------- cards ----------

function ProjectCard({ project }: { project: Project }) {
    return (
        <a
            href={`/projects/${project.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
        >
            <CardThumbnail
                thumbnailUrl={project.thumbnail_url}
                alt={project.title}
                typeLabel="Project"
                difficulty={project.difficulty}
            />
            <div className="flex flex-1 flex-col p-6">
                <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-indigo-500">
                    {project.title}
                </h3>
                {project.description && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">
                        {project.description}
                    </p>
                )}
                <CtaButton label="Start Project" />
            </div>
        </a>
    )
}

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
    return (
        <a
            href={`/tutorials/${tutorial.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
        >
            <CardThumbnail
                thumbnailUrl={tutorial.thumbnail_url}
                alt={tutorial.title}
                typeLabel="Tutorial"
                difficulty={tutorial.difficulty}
            />
            <div className="flex flex-1 flex-col p-6">
                <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-indigo-500">
                    {tutorial.title}
                </h3>
                {tutorial.description && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">
                        {tutorial.description}
                    </p>
                )}
                {tutorial.estimated_minutes && (
                    <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {tutorial.estimated_minutes} min
                    </span>
                )}
                <CtaButton label="Start Tutorial" />
            </div>
        </a>
    )
}
