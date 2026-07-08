"use client";

import { SearchResultCard } from "./SearchResultCard";
import type { SearchHit } from "@/lib/search/searchContent";
import { Stack, Skeleton } from "@/components/ui";

export interface SearchResultsProps {
	readonly query: string;
	readonly loading: boolean;
	readonly results: readonly SearchHit[];
	readonly selectedIndex: number;
	readonly onSelect: (url: string) => void;
	readonly onHighlight: (index: number) => void;
}

export function SearchResults({
	query,
	loading,
	results,
	selectedIndex,
	onSelect,
	onHighlight,
}: SearchResultsProps) {
	if (loading) {
		return (
			<Stack spacing={1.25} role="status" aria-label="Loading search results">
				<Skeleton variant="rounded" height={96} />
				<Skeleton variant="rounded" height={96} />
				<Skeleton variant="rounded" height={96} />
			</Stack>
		);
	}

	return (
		<Stack spacing={1.25} component="div" role="listbox" aria-label="Search results">
			{results.map((result, index) => (
				<SearchResultCard
					key={result.document.id}
					result={result}
					query={query}
					active={index === selectedIndex}
					onSelect={onSelect}
					onHover={() => onHighlight(index)}
				/>
			))}
		</Stack>
	);
}
