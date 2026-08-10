import Link from 'next/link'

export function Header() {
  return (
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
  )
}
