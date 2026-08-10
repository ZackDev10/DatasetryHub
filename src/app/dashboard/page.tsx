import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const firstName = user?.email ? user.email.split('@')[0] : null

  const stats = [
    {
      label: 'Total XP',
      value: 0,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      ),
      tint: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Projects Completed',
      value: 0,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      ),
      tint: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Quizzes Passed',
      value: 0,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.828c-.293.242-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.828c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.242.436-.613.428-.992a7.688 7.688 0 010-.255c.008-.378-.137-.75-.43-.991l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.298-2.247a1.125 1.125 0 011.369-.491l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.213-1.28z"
        />
      ),
      tint: 'bg-green-50 text-green-600',
    },
  ]

  const quickActions = [
    {
      href: '/dashboard/explore',
      title: 'Explore Tracks',
      desc: 'Browse curated datasets, projects, and tutorials by track.',
      tint: 'bg-indigo-50 text-indigo-600',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
        />
      ),
    },
    {
      href: '/quiz',
      title: 'Interactive Quizzes',
      desc: 'Test your knowledge and earn XP with instant feedback.',
      tint: 'bg-amber-50 text-amber-600',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      ),
    },
    {
      href: '/community',
      title: 'Global Chat',
      desc: 'Discuss, debug, and ship together with other data professionals.',
      tint: 'bg-green-50 text-green-600',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Welcome header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Welcome back{firstName ? `, ${firstName}` : ''}
          </h1>
          <p className="mt-2 text-base text-slate-500">Ready to level up your data skills today?</p>
        </div>

        {/* Stats overview row */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.tint}`}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  {stat.icon}
                </svg>
              </span>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions grid */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">Jump right in</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${action.tint}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    {action.icon}
                  </svg>
                </span>
                <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {action.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{action.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
                  Get started
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
