export { buildSearchIndex, writeSearchIndexFile } from "./buildSearchIndex";

export { searchContent, getSearchDocuments, getSearchFilterOptions } from "./searchContent";
export type { SearchHit } from "./searchContent";

export { applyWeightedRanking, rankingKeys, rankingWeights } from "./ranking";
export type { RankedResult } from "./ranking";

export {
	buildFilterOptions,
	clampIndex,
	emptySearchFilters,
	getFallbackSnippet,
	matchesFilters,
	normalizeDocumentText,
	normalizeTerm,
	toggleFilterValue,
	tokenizeQuery,
	uniqueTerms,
} from "./searchUtils";

export type {
	SearchContentType,
	SearchDocument,
	SearchFilterOptions,
	SearchFilterState,
	SearchIndexPayload,
} from "./searchUtils";
