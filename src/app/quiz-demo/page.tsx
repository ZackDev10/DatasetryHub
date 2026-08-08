'use client'

import { useState } from 'react'
import { Quiz } from '@/components/quiz/quiz'
import type { QuizQuestion, QuizResult } from '@/components/quiz/types'
import Link from 'next/link'

const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What does SQL stand for?',
    options: [
      'Structured Query Language',
      'Simple Query Language',
      'Standard Query Logic',
      'Sequential Query Language',
    ],
    correctIndex: 0,
  },
  {
    id: 'q2',
    question: 'Which of the following is NOT a SQL aggregate function?',
    options: ['COUNT', 'AVG', 'MERGE', 'SUM'],
    correctIndex: 2,
  },
  {
    id: 'q3',
    question: 'In a data pipeline, what does ETL stand for?',
    options: [
      'Extract, Transform, Load',
      'Evaluate, Test, Launch',
      'Extract, Transfer, Log',
      'Encode, Transform, Link',
    ],
    correctIndex: 0,
  },
  {
    id: 'q4',
    question: 'What type of database index is most common?',
    options: ['Hash index', 'B-tree index', 'Bitmap index', 'GiST index'],
    correctIndex: 1,
  },
]

export default function QuizDemoPage() {
  const [latestResult, setLatestResult] = useState<QuizResult | null>(null)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Quiz Demo</h1>
        <p className="mt-2 text-base text-slate-500">
          A reusable Quiz component powered by local state — no database required.
        </p>
      </div>

      <Quiz
        title="Data Fundamentals"
        questions={MOCK_QUESTIONS}
        onResult={setLatestResult}
      />

      {latestResult && (
        <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-md">
          <p className="text-lg font-semibold text-emerald-800">
            You scored {latestResult.score} / {latestResult.total}
          </p>
          <p className="mt-1 text-sm text-emerald-700">
            {latestResult.score === latestResult.total
              ? 'Perfect score! 🎉'
              : 'Keep practicing to improve your score.'}
          </p>
        </div>
      )}
    </div>
  )
}
