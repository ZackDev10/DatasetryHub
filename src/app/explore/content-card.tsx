import { Clock, Star } from "lucide-react";
import type { ContentItem } from "./content-data";

const DIFFICULTY_BADGE_STYLES: Record<string, string> = {
    Beginner: "bg-white text-gray-700",
    Intermediate: "bg-white text-gray-700",
    Advanced: "bg-white text-gray-700",
};

const TYPE_BADGE_STYLES: Record<string, string> = {
    PROJECT: "bg-indigo-600 text-white",
    TUTORIAL: "bg-gray-900 text-white",
};

const CATEGORY_TAG_STYLES: Record<string, string> = {
    DATA: "text-blue-600",
    MACHINE: "text-blue-600",
    ENGINEERING: "text-blue-600",
    CLOUD: "text-blue-600",
};

export function ContentCard({ item }: { item: ContentItem }) {
    return (
        <div className="group flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail */}
            <div className="relative aspect-video w-full bg-gradient-to-br from-indigo-50 via-indigo-50 to-purple-50">
                <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                        className={`rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${TYPE_BADGE_STYLES[item.type]}`}
                    >
                        {item.type}
                    </span>
                    <span
                        className={`rounded-md px-2 py-1 text-[11px] font-semibold shadow-sm ${DIFFICULTY_BADGE_STYLES[item.difficulty]}`}
                    >
                        {item.difficulty}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
                    {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-gray-500 line-clamp-2 flex-1">
                    {item.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-500">
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {item.duration}
                        </span>
                        <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {item.rating}
                        </span>
                    </div>
                    <span
                        className={`text-xs font-semibold tracking-wide ${CATEGORY_TAG_STYLES[item.categoryTag]}`}
                    >
                        {item.categoryTag}
                    </span>
                </div>

                <button
                    type="button"
                    className="mt-4 w-full rounded-lg bg-indigo-500 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 transition-colors"
                >
                    {item.ctaLabel}
                </button>
            </div>
        </div>
    );
}
