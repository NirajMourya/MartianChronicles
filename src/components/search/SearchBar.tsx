"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type KeyboardEvent } from "react";

import { SearchEmptyState } from "./SearchEmptyState";
import { SearchFilters } from "./SearchFilters";
import { SearchInput } from "./SearchInput";
import { SearchRecent } from "./SearchRecent";
import { SearchResults } from "./SearchResults";
import { searchContent } from "@/lib/search/searchContent";
import { clampIndex, emptySearchFilters, toggleFilterValue, type SearchFilterState } from "@/lib/search/searchUtils";
import { getSearchFilterOptions } from "@/lib/search/searchContent";
import { Stack, Surface } from "@/components/ui";

const RECENT_SEARCHES_KEY = "mc-recent-searches";

export interface SearchBarProps {
	readonly autoFocus?: boolean;
	readonly limit?: number;
	readonly onRequestClose?: () => void;
}

export function SearchBar({ autoFocus, limit = 20, onRequestClose }: SearchBarProps) {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [filters, setFilters] = useState<SearchFilterState>(emptySearchFilters);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [recentSearches, setRecentSearches] = useState<string[]>(() => {
		if (typeof window === "undefined") {
			return [];
		}

		try {
			const rawValue = window.localStorage.getItem(RECENT_SEARCHES_KEY);
			if (!rawValue) {
				return [];
			}
			const parsed = JSON.parse(rawValue) as unknown;
			if (Array.isArray(parsed)) {
				return parsed.filter((entry): entry is string => typeof entry === "string").slice(0, 8);
			}
		} catch {
			return [];
		}

		return [];
	});

	const filterOptions = useMemo(() => getSearchFilterOptions(), []);
	const results = useMemo(() => searchContent(query, filters, limit), [filters, limit, query]);
	const loading = false;

	const hasActiveFilters = useMemo(() => {
		return (
			filters.tags.length > 0 ||
			filters.categories.length > 0 ||
			filters.topics.length > 0 ||
			filters.technologies.length > 0 ||
			filters.series.length > 0 ||
			filters.contentTypes.length > 0
		);
	}, [filters]);

	const rememberQuery = (value: string) => {
		const normalized = value.trim();
		if (!normalized || typeof window === "undefined") {
			return;
		}
		const next = [normalized, ...recentSearches.filter((entry) => entry !== normalized)].slice(0, 8);
		setRecentSearches(next);
		window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
	};

	const onQueryChange = (nextQuery: string) => {
		setQuery(nextQuery);
		setSelectedIndex(0);
	};

	const openResult = (url: string) => {
		rememberQuery(query);
		router.push(url);
		onRequestClose?.();
	};

	const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setSelectedIndex((current) => clampIndex(current + 1, results.length));
			return;
		}
		if (event.key === "ArrowUp") {
			event.preventDefault();
			setSelectedIndex((current) => clampIndex(current - 1, results.length));
			return;
		}
		if (event.key === "Enter" && selectedIndex >= 0 && results[selectedIndex]) {
			event.preventDefault();
			openResult(results[selectedIndex].document.url);
			return;
		}
		if (event.key === "Escape") {
			event.preventDefault();
			onRequestClose?.();
		}
	};

	const toggleFilter = (key: keyof SearchFilterState, nextValue: string) => {
		setFilters((current) => {
			const nextValues = toggleFilterValue(current[key], nextValue);
			return {
				...current,
				[key]: nextValues,
			};
		});
		setSelectedIndex(0);
	};

	return (
		<Stack spacing={2}>
			<SearchInput
				autoFocus={autoFocus}
				value={query}
				onChange={onQueryChange}
				onKeyDown={onInputKeyDown}
				placeholder="Search by title, headings, tags, categories, technologies, series..."
			/>

			<Surface sx={{ p: 1.5 }}>
				<SearchFilters options={filterOptions} value={filters} onToggle={toggleFilter} />
			</Surface>

			{!query.trim() && !hasActiveFilters ? <SearchRecent items={recentSearches} onSelect={onQueryChange} /> : null}

			{results.length ? (
				<SearchResults
					query={query}
					loading={loading}
					results={results}
					selectedIndex={selectedIndex}
					onSelect={openResult}
					onHighlight={setSelectedIndex}
				/>
			) : (
				<SearchEmptyState query={query} />
			)}
		</Stack>
	);
}
