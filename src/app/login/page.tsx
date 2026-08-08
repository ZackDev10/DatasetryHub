import { LoginForm } from '@/components/auth/login-form'
import { GitHubButton } from '@/components/auth/github-button'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-surface-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <Link href="/" className="text-lg font-bold tracking-tight text-primary-600">
              DatasetryHub
            </Link>
            <h1 className="mt-4 text-xl font-semibold text-surface-900">Welcome back</h1>
            <p className="mt-1 text-sm text-surface-500">Sign in to your account</p>
          </div>

          <LoginForm />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-surface-400">or continue with</span>
            </div>
          </div>

          <GitHubButton />

          <p className="mt-6 text-center text-xs text-surface-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-primary-600 hover:text-primary-700 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
