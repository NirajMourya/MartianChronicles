"use client";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";

import { SearchHighlight } from "./SearchHighlight";
import type { SearchHit } from "@/lib/search/searchContent";
import { getFallbackSnippet } from "@/lib/search/searchUtils";
import { Heading, Text } from "@/components/shared";
import { Card, Chip, Stack } from "@/components/ui";

export interface SearchResultCardProps {
	readonly result: SearchHit;
	readonly query: string;
	readonly active?: boolean;
	readonly onSelect: (url: string) => void;
	readonly onHover?: () => void;
}

export function SearchResultCard({ result, query, active, onSelect, onHover }: SearchResultCardProps) {
	const { document } = result;
	const snippet = getFallbackSnippet(document, query);

	return (
		<Card
			component="article"
			role="option"
			aria-selected={active}
			onMouseEnter={onHover}
			onClick={() => onSelect(document.url)}
			sx={(theme) => ({
				cursor: "pointer",
				outline: active ? `2px solid ${theme.palette.primary.main}` : "none",
				borderColor: active ? theme.palette.primary.main : theme.palette.divider,
				transition: "border-color 160ms ease, transform 160ms ease",
				"&:hover": {
					borderColor: theme.palette.primary.main,
					transform: "translateY(-1px)",
				},
			})}
		>
			<CardContent>
				<Stack spacing={1.25}>
					<Heading level={3} variant="h6" component="h3">
						<SearchHighlight text={document.title} query={query} />
					</Heading>
					<Text component="p" variant="body2">
						<SearchHighlight text={snippet || document.description} query={query} />
					</Text>
					<Stack direction="row" spacing={0.75} flexWrap="wrap" alignItems="center">
						<Chip label={document.contentType} size="small" color="primary" variant="outlined" />
						{document.categories.slice(0, 1).map((category) => (
							<Chip key={`category-${category}`} label={category} size="small" />
						))}
						{document.tags.slice(0, 2).map((tag) => (
							<Chip key={`tag-${tag}`} label={`#${tag}`} size="small" />
						))}
					</Stack>
					<Box component="span" sx={{ color: "text.disabled", fontSize: 12 }}>
						{document.url}
					</Box>
				</Stack>
			</CardContent>
		</Card>
	);
}
