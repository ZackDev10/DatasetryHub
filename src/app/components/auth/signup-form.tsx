'use client'

import { signUpWithPassword } from '@/actions/auth'
import { useState } from 'react'

export function SignUpForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    setError(null)
    const result = await signUpWithPassword(email, password)
    if (result?.error) setError(result.error)
    if (result?.success) setSuccess(true)
  }

  if (success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">Check your email</p>
        <p className="mt-1 text-sm text-green-700">
          We sent a confirmation link. Click it to activate your account.
        </p>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="signup-email" className="block text-sm font-medium text-surface-700 mb-1">
          Email
        </label>
        <input
          id="signup-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
          className="block w-full rounded-lg border border-surface-300 bg-white px-3 py-2.5 text-sm text-surface-900 placeholder-surface-400 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="signup-password" className="block text-sm font-medium text-surface-700 mb-1">
          Password
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          placeholder="At least 6 characters"
          required
          minLength={6}
          autoComplete="new-password"
          className="block w-full rounded-lg border border-surface-300 bg-white px-3 py-2.5 text-sm text-surface-900 placeholder-surface-400 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
      >
        Create Account
      </button>
    </form>
  )
}
