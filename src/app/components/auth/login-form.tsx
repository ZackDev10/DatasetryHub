'use client'

import { signInWithPassword } from '@/actions/auth'
import { useState } from 'react'

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    setError(null)
    const result = await signInWithPassword(email, password)
    if (result?.error) setError(result.error)
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-surface-700 mb-1">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
          className="block w-full rounded-lg border border-surface-300 bg-white px-3 py-2.5 text-sm text-surface-900 placeholder-surface-400 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-surface-700 mb-1">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
          className="block w-full rounded-lg border border-surface-300 bg-white px-3 py-2.5 text-sm text-surface-900 placeholder-surface-400 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-700 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
      >
        Sign In
      </button>
    </form>
  )
}
