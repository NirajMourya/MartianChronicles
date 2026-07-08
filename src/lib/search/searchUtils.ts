export type SearchContentType = "article" | "note" | "project" | "resource" | "series";

export interface SearchDocument {
	readonly id: string;
	readonly slug: string;
	readonly url: string;
	readonly title: string;
	readonly description: string;
	readonly headings: readonly string[];
	readonly tags: readonly string[];
	readonly topics: readonly string[];
	readonly categories: readonly string[];
	readonly technologies: readonly string[];
	readonly series: readonly string[];
	readonly body: string;
	readonly contentType: SearchContentType;
	readonly publishedDate?: string;
}

export interface SearchIndexPayload {
	readonly generatedAt: string;
	readonly documents: readonly SearchDocument[];
}

export interface SearchFilterState {
	readonly tags: readonly string[];
	readonly categories: readonly string[];
	readonly topics: readonly string[];
	readonly technologies: readonly string[];
	readonly series: readonly string[];
	readonly contentTypes: readonly SearchContentType[];
}

export interface SearchFilterOptions {
	readonly tags: readonly string[];
	readonly categories: readonly string[];
	readonly topics: readonly string[];
	readonly technologies: readonly string[];
	readonly series: readonly string[];
	readonly contentTypes: readonly SearchContentType[];
}

export const emptySearchFilters: SearchFilterState = Object.freeze({
	tags: Object.freeze([]),
	categories: Object.freeze([]),
	topics: Object.freeze([]),
	technologies: Object.freeze([]),
	series: Object.freeze([]),
	contentTypes: Object.freeze([]),
});

const stripMarkdown = (value: string): string => {
	return value
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`([^`]*)`/g, "$1")
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
		.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
		.replace(/^#{1,6}\s+/gm, "")
		.replace(/[>*_~]/g, "")
		.replace(/\s+/g, " ")
		.trim();
};

export const normalizeTerm = (value: string): string => value.trim().toLowerCase();

export const uniqueTerms = (values: readonly string[]): string[] => {
	const seen = new Set<string>();
	for (const value of values) {
		const normalized = normalizeTerm(value);
		if (normalized) {
			seen.add(normalized);
		}
	}
	return [...seen].sort((a, b) => a.localeCompare(b));
};

export const tokenizeQuery = (query: string): string[] =>
	query
		.trim()
		.split(/\s+/)
		.map((part) => part.trim())
		.filter(Boolean);

export const normalizeDocumentText = (value: string): string => stripMarkdown(value).toLowerCase();

export function buildFilterOptions(documents: readonly SearchDocument[]): SearchFilterOptions {
	return {
		tags: uniqueTerms(documents.flatMap((doc) => doc.tags)),
		categories: uniqueTerms(documents.flatMap((doc) => doc.categories)),
		topics: uniqueTerms(documents.flatMap((doc) => doc.topics)),
		technologies: uniqueTerms(documents.flatMap((doc) => doc.technologies)),
		series: uniqueTerms(documents.flatMap((doc) => doc.series)),
		contentTypes: uniqueTerms(documents.map((doc) => doc.contentType)) as SearchContentType[],
	};
}

export function toggleFilterValue(values: readonly string[], nextValue: string): string[] {
	const normalizedValue = normalizeTerm(nextValue);
	const normalizedValues = values.map(normalizeTerm);
	if (normalizedValues.includes(normalizedValue)) {
		return normalizedValues.filter((value) => value !== normalizedValue);
	}
	return [...normalizedValues, normalizedValue].sort((a, b) => a.localeCompare(b));
}

const hasOverlap = (left: readonly string[], right: readonly string[]): boolean => {
	if (!left.length || !right.length) {
		return false;
	}
	const set = new Set(left.map(normalizeTerm));
	return right.some((value) => set.has(normalizeTerm(value)));
};

export function matchesFilters(document: SearchDocument, filters: SearchFilterState): boolean {
	if (filters.tags.length && !hasOverlap(document.tags, filters.tags)) {
		return false;
	}
	if (filters.categories.length && !hasOverlap(document.categories, filters.categories)) {
		return false;
	}
	if (filters.topics.length && !hasOverlap(document.topics, filters.topics)) {
		return false;
	}
	if (filters.technologies.length && !hasOverlap(document.technologies, filters.technologies)) {
		return false;
	}
	if (filters.series.length && !hasOverlap(document.series, filters.series)) {
		return false;
	}
	if (filters.contentTypes.length && !filters.contentTypes.includes(document.contentType)) {
		return false;
	}
	return true;
}

export function getFallbackSnippet(document: SearchDocument, query: string, maxLength = 180): string {
	const cleanBody = document.body.trim();
	if (!cleanBody) {
		return document.description;
	}

	const queryTerms = tokenizeQuery(query.toLowerCase());
	const bodyLower = cleanBody.toLowerCase();
	const firstMatchIndex = queryTerms
		.map((term) => bodyLower.indexOf(term))
		.filter((index) => index >= 0)
		.sort((a, b) => a - b)[0];

	if (typeof firstMatchIndex !== "number") {
		return cleanBody.length <= maxLength ? cleanBody : `${cleanBody.slice(0, maxLength).trimEnd()}...`;
	}

	const start = Math.max(0, firstMatchIndex - Math.floor(maxLength / 3));
	const end = Math.min(cleanBody.length, start + maxLength);
	const prefix = start > 0 ? "..." : "";
	const suffix = end < cleanBody.length ? "..." : "";
	return `${prefix}${cleanBody.slice(start, end).trim()}${suffix}`;
}

export function clampIndex(index: number, length: number): number {
	if (length <= 0) {
		return -1;
	}
	if (index < 0) {
		return length - 1;
	}
	if (index >= length) {
		return 0;
	}
	return index;
}
