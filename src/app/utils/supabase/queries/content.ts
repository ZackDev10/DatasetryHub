// src/app/utils/supabase/queries/content.ts
import { createClient } from '@/utils/supabase/client'

export type Track = {
    id: string
    name: string
    slug: string
    description: string | null
}

export type Project = {
    id: string
    track_id: string | null
    title: string
    slug: string
    description: string | null
    difficulty: 'beginner' | 'intermediate' | 'advanced' | null
    thumbnail_url: string | null
    repo_url: string | null
    demo_url: string | null
}

export type Tutorial = {
    id: string
    track_id: string | null
    title: string
    slug: string
    description: string | null
    difficulty: 'beginner' | 'intermediate' | 'advanced' | null
    estimated_minutes: number | null
    thumbnail_url: string | null
}

/** Fetch all tracks for populating the filter UI */
export async function getTracks(): Promise<Track[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('tracks')
        .select('id, name, slug, description')
        .order('name')

    if (error) throw new Error(`Failed to fetch tracks: ${error.message}`)
    return data ?? []
}

/**
 * Fetch projects, optionally filtered by track.
 * Pass trackId = null (or omit) to fetch across all tracks.
 */
export async function getProjects(trackId?: string | null): Promise<Project[]> {
    const supabase = createClient()
    let query = supabase
        .from('projects')
        .select('id, track_id, title, slug, description, difficulty, thumbnail_url, repo_url, demo_url')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

    if (trackId) {
        query = query.eq('track_id', trackId)
    }

    const { data, error } = await query
    if (error) throw new Error(`Failed to fetch projects: ${error.message}`)
    return data ?? []
}

/** Fetch tutorials, optionally filtered by track. */
export async function getTutorials(trackId?: string | null): Promise<Tutorial[]> {
    const supabase = createClient()
    let query = supabase
        .from('tutorials')
        .select('id, track_id, title, slug, description, difficulty, estimated_minutes, thumbnail_url')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

    if (trackId) {
        query = query.eq('track_id', trackId)
    }

    const { data, error } = await query
    if (error) throw new Error(`Failed to fetch tutorials: ${error.message}`)
    return data ?? []
}
