import { SignUpForm } from '@/components/auth/signup-form'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-surface-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <Link href="/" className="text-lg font-bold tracking-tight text-primary-600">
              DatasetryHub
            </Link>
            <h1 className="mt-4 text-xl font-semibold text-surface-900">Create your account</h1>
            <p className="mt-1 text-sm text-surface-500">Start learning data engineering today</p>
          </div>

          <SignUpForm />

          <p className="mt-6 text-center text-xs text-surface-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
