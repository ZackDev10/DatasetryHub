import type { ContentItem } from "./content-data";
import { ContentCard } from "./content-card";

export function ContentGrid({ items }: { items: ContentItem[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <ContentCard key={item.id} item={item} />
            ))}
        </div>
    );
}
