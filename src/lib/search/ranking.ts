import type { FuseResult } from "fuse.js";

import type { SearchDocument } from "./searchUtils";

export const rankingWeights = Object.freeze({
	title: 0.32,
	headings: 0.18,
	tags: 0.16,
	topics: 0.1,
	description: 0.1,
	categories: 0.05,
	technologies: 0.04,
	series: 0.03,
	body: 0.02,
});

export const rankingKeys = [
	{ name: "title", weight: rankingWeights.title },
	{ name: "headings", weight: rankingWeights.headings },
	{ name: "tags", weight: rankingWeights.tags },
	{ name: "topics", weight: rankingWeights.topics },
	{ name: "description", weight: rankingWeights.description },
	{ name: "categories", weight: rankingWeights.categories },
	{ name: "technologies", weight: rankingWeights.technologies },
	{ name: "series", weight: rankingWeights.series },
	{ name: "body", weight: rankingWeights.body },
] as const;

const recentnessBoost = (dateValue?: string): number => {
	if (!dateValue) {
		return 1;
	}
	const date = new Date(dateValue);
	if (Number.isNaN(date.getTime())) {
		return 1;
	}
	const ageMs = Math.max(0, Date.now() - date.getTime());
	const ageDays = ageMs / (1000 * 60 * 60 * 24);
	if (ageDays <= 30) {
		return 1.12;
	}
	if (ageDays <= 180) {
		return 1.06;
	}
	return 1;
};

const exactTitleBoost = (title: string, query: string): number => {
	const normalizedTitle = title.toLowerCase();
	const normalizedQuery = query.trim().toLowerCase();
	if (!normalizedQuery) {
		return 1;
	}
	if (normalizedTitle === normalizedQuery) {
		return 1.25;
	}
	if (normalizedTitle.startsWith(normalizedQuery)) {
		return 1.15;
	}
	return 1;
};

export interface RankedResult {
	readonly item: SearchDocument;
	readonly score: number;
	readonly rawScore: number;
	readonly matches?: FuseResult<SearchDocument>["matches"];
}

export function applyWeightedRanking(
	results: readonly FuseResult<SearchDocument>[],
	query: string,
): RankedResult[] {
	return [...results]
		.map((entry) => {
			const rawScore = typeof entry.score === "number" ? entry.score : 1;
			const base = 1 / (1 + rawScore);
			const score = base * exactTitleBoost(entry.item.title, query) * recentnessBoost(entry.item.publishedDate);

			return {
				item: entry.item,
				score,
				rawScore,
				matches: entry.matches,
			};
		})
		.sort((left, right) => right.score - left.score);
}
