import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 border-b border-surface-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-bold tracking-tight text-primary-600">
              DatasetryHub
            </Link>
            <nav className="hidden sm:flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                Dashboard
              </Link>
              <Link href="/explore" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                Explore
              </Link>
              <Link href="/quiz-demo" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                Quiz
              </Link>
              <Link href="/community" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                Community
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
