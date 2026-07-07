import "server-only";

import { getContent, type ContentLoadOptions } from "./getContent";

export interface TermCount {
	readonly value: string;
	readonly count: number;
}

export const getAllTopics = (options: ContentLoadOptions = {}): TermCount[] => {
	const topicCounts = new Map<string, number>();
	for (const entry of getContent(options)) {
		for (const topic of entry.topics) {
			const key = topic.trim();
			if (!key) {
				continue;
			}
			topicCounts.set(key, (topicCounts.get(key) ?? 0) + 1);
		}
	}

	return [...topicCounts.entries()]
		.map(([value, count]) => ({ value, count }))
		.sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
};
