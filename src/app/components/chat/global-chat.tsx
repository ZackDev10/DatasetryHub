// src/components/chat/global-chat.tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useSession } from '@/providers/session-provider'
import type { RealtimeChannel, User } from '@supabase/supabase-js'

type Message = {
  id: string
  room_id: string
  user_id: string
  content: string
  created_at: string
  profiles?: {
    username: string | null
    avatar_url: string | null
  }
}

/**
 * Best-effort display name for a session user:
 * GitHub/name metadata first, then the account email, then null.
 */
function getSessionDisplayName(user: User | null): string | null {
  if (!user) return null
  const meta = user.user_metadata as Record<string, unknown> | undefined
  const metadataName = [meta?.full_name, meta?.user_name, meta?.name].find(
    (v): v is string => typeof v === 'string' && v.trim().length > 0
  )
  return metadataName ?? user.email ?? null
}

export function GlobalChat({ roomId }: { roomId: string }) {
  // Pull the authenticated user directly from the shared session context
  // instead of relying on a prop passed down from the page. This is the
  // same context populated by SessionProvider in the root layout, so
  // GlobalChat now stays correct regardless of how/where it's mounted.
  const { user, isLoading: isSessionLoading } = useSession()
  const currentUserId = user?.id ?? null
  const myDisplayName = getSessionDisplayName(user)
  const myAvatarUrl =
    typeof user?.user_metadata?.avatar_url === 'string' ? user.user_metadata.avatar_url : null

  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()
  const channelRef = useRef<RealtimeChannel | null>(null)
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null)
  // Only attempt the profile backfill once per mount — never on every send.
  const profileBackfillTriedRef = useRef(false)

  // Resolve a readable name for a message. Prefers the profiles join, falls
  // back to the session (email/metadata) for the signed-in user, which fixes
  // the "Unknown user" label on a new user's very first message.
  const messageSenderName = useCallback(
    (message: Message): string =>
      message.profiles?.username ?? (message.user_id === currentUserId ? myDisplayName : null) ?? 'Unknown user',
    [currentUserId, myDisplayName]
  )

  // New users (and email sign-ups without name metadata) have no profile row
  // yet, so the profiles join yields nothing. Backfill the profile once per
  // mount with the session name so every client sees it, not just the sender.
  const backfillProfile = useCallback(async () => {
    if (!currentUserId || !myDisplayName || profileBackfillTriedRef.current) return
    profileBackfillTriedRef.current = true
    try {
      const { data: existing } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('id', currentUserId)
        .maybeSingle()

      if (existing?.username) return

      await supabase
        .from('profiles')
        .upsert(
          { id: currentUserId, username: myDisplayName, avatar_url: myAvatarUrl },
          { onConflict: 'id' }
        )
        .select()
    } catch {
      // Non-fatal: the sender still sees their own name via the session
      // fallback in messageSenderName.
    }
  }, [currentUserId, myDisplayName, myAvatarUrl, supabase])

  // Initial load of message history for this room
  useEffect(() => {
    let cancelled = false

    async function loadMessages() {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('messages')
        .select('id, room_id, user_id, content, created_at, profiles(username, avatar_url)')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true })
        .limit(100)

      if (cancelled) return

      if (error) {
        setError(`Failed to load messages: ${error.message}`)
      } else {
        setMessages((data as unknown as Message[]) ?? [])
      }
      setIsLoading(false)
    }

    loadMessages()
    backfillProfile()
    return () => {
      cancelled = true
    }
  }, [roomId, supabase, backfillProfile])

  // Real-time subscription — scoped to this room only
  useEffect(() => {
    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          const newMessage = payload.new as Message

          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('username, avatar_url')
              .eq('id', newMessage.user_id)
              .maybeSingle()

            setMessages((prev) => {
              if (prev.some((m) => m.id === newMessage.id)) return prev
              return [...prev, { ...newMessage, profiles: profile ?? undefined }]
            })
          } catch {
            setMessages((prev) => {
              if (prev.some((m) => m.id === newMessage.id)) return prev
              return [...prev, newMessage]
            })
          }
        }
      )
      .subscribe()

    channelRef.current = channel

    return () => {
      supabase.removeChannel(channel)
      channelRef.current = null
    }
  }, [roomId, supabase])

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const content = draft.trim()
      if (!content || !currentUserId || isSending) return

      setIsSending(true)
      setError(null)

      // Backfill the profile row alongside the first send so the name is
      // immediately visible to everyone in the room.
      backfillProfile()

      const { error } = await supabase.from('messages').insert({
        room_id: roomId,
        user_id: currentUserId,
        content,
      })

      if (error) {
        setError(`Failed to send: ${error.message}`)
      } else {
        setDraft('')
      }
      setIsSending(false)
    },
    [draft, currentUserId, isSending, roomId, supabase, backfillProfile]
  )

  // Distinguish "still checking auth" from "confirmed signed out" —
  // this is the piece that was missing before. Without it, a session
  // that's still resolving looks identical to no session at all.
  const placeholder = isSessionLoading
    ? 'Checking session…'
    : currentUserId
    ? 'Type a message…'
    : 'Sign in to chat'

  return (
    <div className="flex flex-col h-[600px] rounded-xl border border-surface-200 bg-white shadow-sm">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading && (
          <p className="text-sm text-surface-400 text-center">Loading messages…</p>
        )}

        {!isLoading && messages.length === 0 && (
          <p className="text-sm text-surface-400 text-center">
            No messages yet — say hello.
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.user_id === currentUserId ? 'items-end' : 'items-start'
            }`}
          >
            <span className="text-xs text-surface-400 mb-0.5">
              {messageSenderName(message)}
            </span>
            <div
              className={`px-3 py-2 rounded-lg max-w-xs text-sm shadow-sm ${
                message.user_id === currentUserId
                  ? 'bg-primary-600 text-white'
                  : 'bg-surface-100 text-surface-900'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={scrollAnchorRef} />
      </div>

      {error && (
        <div className="px-4 py-2 text-sm text-red-600 bg-red-50 border-t border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSend} className="flex gap-2 p-3 border-t border-surface-200">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
          disabled={isSessionLoading || !currentUserId || isSending}
          maxLength={2000}
          className="flex-1 px-3 py-2 border border-surface-300 rounded-lg text-sm shadow-sm disabled:bg-surface-50 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={isSessionLoading || !currentUserId || isSending || !draft.trim()}
          className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-primary-700 disabled:opacity-40 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  )
}
