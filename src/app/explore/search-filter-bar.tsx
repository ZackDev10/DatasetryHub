"use client";

import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";

export function SearchFilterBar() {
    const [query, setQuery] = useState("");

    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search resources, topics, or datasets..."
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <button
                type="button"
                className="inline-flex items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-52"
            >
                <span className="flex items-center gap-2">
                    <SortIcon className="h-4 w-4 text-gray-500" />
                    Sort: Recommended
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                <SlidersHorizontal className="h-4 w-4" />
                Filter
            </button>
        </div>
    );
}

function SortIcon(props: React.SVGProps<SVGSVGElement>) {
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
                d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
        </svg>
    );
}
