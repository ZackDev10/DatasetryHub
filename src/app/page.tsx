import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Nav ─── */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold tracking-tight text-indigo-600">
            DatasetryHub
          </Link>
          <nav className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/explore"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-600 transition-colors"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column: copy + CTAs */}
            <div>
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold tracking-wide text-indigo-600">
                LEARN. BUILD. MASTER DATA.
              </span>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Master Data Skills
                <br />
                Through Practice
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-500">
                Learn data skills through structured tracks, hands-on projects, tutorials,
                AI-powered guidance, and interactive quizzes. Designed for the next generation
                of data leaders.
              </p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-600 transition-colors"
                >
                  Start Learning Free
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Explore Tracks
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['A', 'B', 'C', 'D'].map((seed, i) => (
                    <span
                      key={seed}
                      className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                      style={{
                        background: [
                          'linear-gradient(135deg,#a5b4fc,#818cf8)',
                          'linear-gradient(135deg,#fbcfe8,#f472b6)',
                          'linear-gradient(135deg,#bbf7d0,#4ade80)',
                          'linear-gradient(135deg,#fde68a,#fbbf24)',
                        ][i],
                      }}
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  Joined by <span className="font-semibold text-slate-700">12,000+</span> data
                  professionals
                </p>
              </div>
            </div>

            {/* Right column: hero image */}
            <div className="relative flex justify-center items-center w-full h-full">
              <Image
                src="/hero-illustration.jpg"
                alt="Data Skills Isometric Illustration"
                width={600}
                height={500}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom feature bar ─── */}
      <section className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col divide-y divide-slate-100 sm:flex-row sm:divide-x sm:divide-y-0">
            {[
              {
                label: 'Hands-on Projects',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                ),
              },
              {
                label: 'Practical Tutorials',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                ),
              },
              {
                label: 'Interactive Assessments',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                ),
              },
            ].map((f) => (
              <div key={f.label} className="flex flex-1 items-center justify-center gap-2.5 px-4 py-3 sm:py-0">
                <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  {f.icon}
                </svg>
                <span className="text-sm font-medium text-slate-600">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Feature grid ─── */}
      <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Structured Tracks', desc: 'Follow curated learning paths from beginner to advanced — no more wondering what to study next.' },
              { title: 'Real‑time Chat', desc: 'Collaborate with peers in global and project‑scoped rooms. Discuss, debug, and ship together.' },
              { title: 'Interactive Quizzes', desc: 'Reinforce your knowledge with instant‑feedback quizzes after every tutorial.' },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
          &copy; 2026 DatasetryHub. Built for the data engineering community.
        </div>
      </footer>
    </div>
  )
}
