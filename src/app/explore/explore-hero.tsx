export function ExploreHero() {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Explore Learning Content
                </h1>
                <p className="mt-2 text-gray-500">
                    Discover curated datasets, tracks, and projects designed for
                    professional growth.
                </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <BookmarkIcon className="h-4 w-4" />
                    Save to Library
                </button>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                >
                    Create New Project
                </button>
            </div>
        </div>
    );
}

function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
        </svg>
    );
}
