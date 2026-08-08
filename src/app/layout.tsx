import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import { SessionProvider } from '@/providers/session-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'DatasetryHub — Data Ecosystem MVP',
  description: 'Master modern data engineering through hands-on projects, tutorials, and real-time collaboration.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <SessionProvider initialSession={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
