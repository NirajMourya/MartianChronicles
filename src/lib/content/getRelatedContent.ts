import "server-only";

import {
	getContent,
	type AnyContentEntry,
	type ContentCollection,
	type ContentLoadOptions,
} from "./getContent";

export interface RelatedContentOptions extends ContentLoadOptions {
	readonly collection?: ContentCollection;
	readonly slug: string;
	readonly limit?: number;
}

const hasOverlap = (source: readonly string[], target: readonly string[]): number => {
	if (!source.length || !target.length) {
		return 0;
	}

	const targetSet = new Set(target.map((item) => item.toLowerCase()));
	return source.reduce((count, entry) => {
		return count + (targetSet.has(entry.toLowerCase()) ? 1 : 0);
	}, 0);
};

const calculateScore = (source: AnyContentEntry, candidate: AnyContentEntry): number => {
	let score = 0;

	if (source.series && candidate.series && source.series === candidate.series) {
		score += 6;
	}

	if (source.category && candidate.category && source.category === candidate.category) {
		score += 3;
	}

	score += hasOverlap(source.topics, candidate.topics) * 3;
	score += hasOverlap(source.tags, candidate.tags) * 2;
	score += hasOverlap(source.technologies, candidate.technologies) * 2;

	return score;
};

export const getRelatedContent = ({
	slug,
	collection,
	limit = 4,
	...options
}: RelatedContentOptions): AnyContentEntry[] => {
	const contentEntries = getContent(options);
	const sourceEntry = contentEntries.find((entry) => {
		if (collection) {
			return entry.collection === collection && entry.slug === slug;
		}
		return entry.slug === slug;
	});

	if (!sourceEntry) {
		return [];
	}

	const scored = contentEntries
		.filter(
			(entry) => !(entry.collection === sourceEntry.collection && entry.slug === sourceEntry.slug),
		)
		.map((entry) => ({ entry, score: calculateScore(sourceEntry, entry) }))
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score || b.entry.wordCount - a.entry.wordCount)
		.slice(0, limit)
		.map((item) => item.entry);

	return scored;
};
