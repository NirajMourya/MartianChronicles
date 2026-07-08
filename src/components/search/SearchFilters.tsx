"use client";

import { Text } from "@/components/shared";
import { Chip, Stack } from "@/components/ui";
import type { SearchContentType, SearchFilterOptions, SearchFilterState } from "@/lib/search/searchUtils";

export interface SearchFiltersProps {
	readonly options: SearchFilterOptions;
	readonly value: SearchFilterState;
	readonly onToggle: (key: keyof SearchFilterState, nextValue: string) => void;
}

const toLabel = (value: string): string => value.replace(/-/g, " ");

interface FilterGroupProps {
	readonly label: string;
	readonly values: readonly string[];
	readonly selected: readonly string[];
	readonly onToggle: (value: string) => void;
}

function FilterGroup({ label, values, selected, onToggle }: FilterGroupProps) {
	if (!values.length) {
		return null;
	}

	return (
		<Stack spacing={0.75}>
			<Text component="p" variant="caption" sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}>
				{label}
			</Text>
			<Stack direction="row" spacing={0.75} flexWrap="wrap">
				{values.map((entry) => {
					const active = selected.includes(entry);
					return (
						<Chip
							key={`${label}-${entry}`}
							label={toLabel(entry)}
							variant={active ? "filled" : "outlined"}
							color={active ? "primary" : "default"}
							onClick={() => onToggle(entry)}
						/>
					);
				})}
			</Stack>
		</Stack>
	);
}

export function SearchFilters({ options, value, onToggle }: SearchFiltersProps) {
	return (
		<Stack spacing={1.25}>
			<FilterGroup
				label="Tags"
				values={options.tags}
				selected={value.tags}
				onToggle={(entry) => onToggle("tags", entry)}
			/>
			<FilterGroup
				label="Categories"
				values={options.categories}
				selected={value.categories}
				onToggle={(entry) => onToggle("categories", entry)}
			/>
			<FilterGroup
				label="Topics"
				values={options.topics}
				selected={value.topics}
				onToggle={(entry) => onToggle("topics", entry)}
			/>
			<FilterGroup
				label="Technologies"
				values={options.technologies}
				selected={value.technologies}
				onToggle={(entry) => onToggle("technologies", entry)}
			/>
			<FilterGroup
				label="Series"
				values={options.series}
				selected={value.series}
				onToggle={(entry) => onToggle("series", entry)}
			/>
			<FilterGroup
				label="Content Type"
				values={options.contentTypes as SearchContentType[]}
				selected={value.contentTypes}
				onToggle={(entry) => onToggle("contentTypes", entry)}
			/>
		</Stack>
	);
}
