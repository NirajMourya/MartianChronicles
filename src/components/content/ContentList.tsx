import { ArticleCard } from "@/components/article";
import { Stack } from "@/components/ui";

import type { ContentItem } from "./types";

export interface ContentListProps {
	readonly items: readonly ContentItem[];
}

export function ContentList({ items }: ContentListProps) {
	return (
		<Stack spacing={2}>
			{items.map((item) => (
				<ArticleCard key={item.href} article={item} />
			))}
		</Stack>
	);
}
