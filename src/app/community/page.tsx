import { createClient } from '@/utils/supabase/server'
import { GlobalChat } from '@/components/chat/global-chat'
import Link from 'next/link'

export default async function CommunityPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  let roomId: string | null = null

  const { data: existingRoom } = await supabase
    .from('rooms')
    .select('id')
    .eq('name', 'Global')
    .single()

  if (existingRoom) {
    roomId = existingRoom.id
  } else if (user) {
    const { data: newRoom } = await supabase
      .from('rooms')
      .insert({ name: 'Global', description: 'General discussion for everyone.', is_private: false })
      .select('id')
      .single()

    roomId = newRoom?.id ?? null
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Community</h1>
        <p className="mt-2 text-base text-slate-500">
          Real-time discussion with the whole DatasetryHub community.
        </p>
      </div>

      {roomId ? (
        <GlobalChat roomId={roomId} />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-16 text-center shadow-md">
          <p className="text-sm text-slate-400">Chat room unavailable. Try signing in.</p>
        </div>
      )}
    </div>
  )
}
