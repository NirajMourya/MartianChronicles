"use client";

import HistoryRounded from "@mui/icons-material/HistoryRounded";

import { Heading, Text } from "@/components/shared";
import { Chip, Stack } from "@/components/ui";

export interface SearchRecentProps {
	readonly items: readonly string[];
	readonly onSelect: (value: string) => void;
}

export function SearchRecent({ items, onSelect }: SearchRecentProps) {
	if (!items.length) {
		return null;
	}

	return (
		<Stack spacing={1}>
			<Stack direction="row" spacing={1} alignItems="center">
				<HistoryRounded fontSize="small" color="action" />
				<Heading level={3} variant="h6" component="h3">
					Recent searches
				</Heading>
			</Stack>
			<Text component="p" variant="body2">
				Jump back into recent queries.
			</Text>
			<Stack direction="row" spacing={0.75} flexWrap="wrap">
				{items.map((item) => (
					<Chip key={item} label={item} onClick={() => onSelect(item)} />
				))}
			</Stack>
		</Stack>
	);
}
