import Link from 'next/link'
import { Bell, HelpCircle } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 border-b border-surface-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

          {/* Left side: Logo & Navigation */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg font-bold tracking-tight text-primary-600">
              DatasetryHub
            </Link>
            <nav className="hidden sm:flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                Dashboard
              </Link>
              <Link href="/dashboard/explore" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                Explore
              </Link>
              <Link href="/quiz-demo" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                Quiz
              </Link>
              <Link href="/community" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                Community
              </Link>
              <Link href="/dashboard/debugger" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                Debugger
              </Link>
              <Link href="/dashboard/sandbox" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                Sandbox
              </Link>
            </nav>
          </div>

          {/* Right side: Fiverr-style Avatar & Icons */}
          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-4 text-slate-500 sm:flex">
              <button className="transition-colors hover:text-primary-600">
                <HelpCircle size={20} />
              </button>
              <button className="relative transition-colors hover:text-primary-600">
                <Bell size={20} />
                {/* Notification Badge */}
                <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-red-500"></span>
              </button>
            </div>

            {/* Divider */}
            <div className="hidden h-6 w-px bg-surface-200 sm:block"></div>

            {/* User Avatar Link */}
            <Link href="/zack" className="group relative flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-sm font-bold text-white shadow-sm ring-2 ring-transparent transition-all group-hover:ring-indigo-500/30">
                ZA
              </div>
              {/* Online Status Indicator */}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"></span>
            </Link>
          </div>

        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}

