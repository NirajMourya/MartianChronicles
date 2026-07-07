import "server-only";

import { getContent, type ContentLoadOptions } from "./getContent";

export interface TermCount {
	readonly value: string;
	readonly count: number;
}

export const getAllCategories = (options: ContentLoadOptions = {}): TermCount[] => {
	const categoryCounts = new Map<string, number>();
	for (const entry of getContent(options)) {
		const key = entry.category?.trim();
		if (!key) {
			continue;
		}
		categoryCounts.set(key, (categoryCounts.get(key) ?? 0) + 1);
	}

	return [...categoryCounts.entries()]
		.map(([value, count]) => ({ value, count }))
		.sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
};
