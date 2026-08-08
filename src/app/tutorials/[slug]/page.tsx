import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export default function TutorialDetailPage({ params }: Props) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/explore"
        className="inline-flex items-center gap-1 text-sm font-medium text-surface-500 hover:text-surface-700 transition-colors mb-4"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Explore
      </Link>

      <h1 className="text-2xl font-bold text-surface-900 sm:text-3xl capitalize mb-2">
        {params.slug.replace(/-/g, ' ')}
      </h1>

      <div className="mt-6 rounded-xl border border-surface-200 bg-white p-8 shadow-sm">
        <p className="text-surface-500 leading-relaxed">
          Tutorial detail page is under construction. Check back soon for
          step-by-step guidance and embedded quizzes.
        </p>
      </div>
    </div>
  )
}
