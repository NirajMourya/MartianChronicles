"use client";

import SearchOffRounded from "@mui/icons-material/SearchOffRounded";

import { EmptyState } from "@/components/shared";

export interface SearchEmptyStateProps {
	readonly query: string;
}

export function SearchEmptyState({ query }: SearchEmptyStateProps) {
	if (!query.trim()) {
		return (
			<EmptyState
				title="Search the chronicles"
				description="Find articles and notes by title, headings, tags, topics, technologies, series, or content type."
			/>
		);
	}

	return (
		<EmptyState
			title="No matching results"
			description={`No results found for \"${query}\". Try fewer words or adjust filters.`}
			icon={<SearchOffRounded color="disabled" fontSize="large" />}
		/>
	);
}
