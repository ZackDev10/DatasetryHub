import { ExploreHero } from "@/explore/explore-hero";
import { SearchFilterBar } from "@/explore/search-filter-bar";
import { CategoryPills } from "@/explore/category-pills";
import { ContentGrid } from "@/explore/content-grid";
import { CONTENT_ITEMS } from "@/explore/content-data";

export default function DashboardExplorePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <ExploreHero />

        <div className="mt-8">
          <SearchFilterBar />
        </div>

        <div className="mt-6">
          <CategoryPills />
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Recommended for you{" "}
              <span className="ml-2 align-middle inline-block text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-2.5 py-1">
                Based on your goals
              </span>
            </h2>
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View all results
            </a>
          </div>

          <ContentGrid items={CONTENT_ITEMS} />
        </div>
      </div>
    </div>
  );
}
