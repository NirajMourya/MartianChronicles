import "server-only";

import { getContent, type ContentLoadOptions } from "./getContent";

export interface TermCount {
	readonly value: string;
	readonly count: number;
}

export const getAllTags = (options: ContentLoadOptions = {}): TermCount[] => {
	const tagCounts = new Map<string, number>();
	for (const entry of getContent(options)) {
		for (const tag of entry.tags) {
			const key = tag.trim();
			if (!key) {
				continue;
			}
			tagCounts.set(key, (tagCounts.get(key) ?? 0) + 1);
		}
	}

	return [...tagCounts.entries()]
		.map(([value, count]) => ({ value, count }))
		.sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
};
