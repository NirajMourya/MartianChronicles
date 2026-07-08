import { ArticleCard } from "@/components/article";
import { Grid } from "@/components/ui";

import type { ContentItem } from "./types";

export interface ContentGridProps {
	readonly items: readonly ContentItem[];
}

export function ContentGrid({ items }: ContentGridProps) {
	return (
		<Grid minItemWidth={280} gap={2.5}>
			{items.map((item) => (
				<ArticleCard key={item.href} article={item} />
			))}
		</Grid>
	);
}
