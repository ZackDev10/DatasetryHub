"use client";

import { useState } from "react";

const CATEGORIES = [
  "All",
  "Data Analytics",
  "Machine Learning",
  "Data Engineering",
  "Cloud Architecture",
  "Statistics",
  "Python",
  "SQL",
];

export function CategoryPills() {
  const [active, setActive] = useState("All");

  return (
    <div className="flex flex-wrap items-center gap-2">
      {CATEGORIES.map((category) => {
        const isActive = active === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            ].join(" ")}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
