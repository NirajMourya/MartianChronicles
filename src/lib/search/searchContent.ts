import Fuse from "fuse.js";

import searchIndexData from "@/generated/search-index.json";

import { applyWeightedRanking, rankingKeys } from "./ranking";
import {
	buildFilterOptions,
	emptySearchFilters,
	matchesFilters,
	type SearchDocument,
	type SearchFilterOptions,
	type SearchFilterState,
	type SearchIndexPayload,
} from "./searchUtils";

export interface SearchHit {
	readonly document: SearchDocument;
	readonly score: number;
	readonly rawScore: number;
}

const payload = searchIndexData as SearchIndexPayload;
const documents = payload.documents;
const filterOptions = buildFilterOptions(documents);

const fuse = new Fuse(documents, {
	keys: rankingKeys,
	includeMatches: true,
	includeScore: true,
	ignoreLocation: true,
	findAllMatches: true,
	minMatchCharLength: 2,
	threshold: 0.38,
});

export function getSearchDocuments(): readonly SearchDocument[] {
	return documents;
}

export function getSearchFilterOptions(): SearchFilterOptions {
	return filterOptions;
}

const sortByPublishedDateDesc = (entries: readonly SearchDocument[]): SearchDocument[] => {
	return [...entries].sort((left, right) => {
		const leftTime = left.publishedDate ? new Date(left.publishedDate).getTime() : 0;
		const rightTime = right.publishedDate ? new Date(right.publishedDate).getTime() : 0;
		return rightTime - leftTime;
	});
};

export function searchContent(
	query: string,
	filters: SearchFilterState = emptySearchFilters,
	limit = 20,
): SearchHit[] {
	const normalizedQuery = query.trim();

	if (!normalizedQuery) {
		const filtered = sortByPublishedDateDesc(documents).filter((document) => matchesFilters(document, filters));
		return filtered.slice(0, limit).map((document) => ({
			document,
			score: 0,
			rawScore: 1,
		}));
	}

	const ranked = applyWeightedRanking(
		fuse.search(normalizedQuery, { limit: Math.max(limit * 3, limit + 12) }),
		normalizedQuery,
	);

	return ranked
		.filter((entry) => matchesFilters(entry.item, filters))
		.slice(0, limit)
		.map((entry) => ({
			document: entry.item,
			score: entry.score,
			rawScore: entry.rawScore,
		}));
}
