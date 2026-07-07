"use client";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Heading, Link, Text } from "../shared";
import { Card, Chip, Stack } from "../ui";

import type { ArticleCardData } from "./types";
import { ReadingTime } from "./ReadingTime";

export interface ArticleCardProps {
	readonly article: ArticleCardData;
}

/**
 * Reusable article summary card for listings and feeds.
 */
export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Card component="article">
			<CardContent>
				<Stack spacing={1.25}>
					<Heading level={3} variant="h5" component="h3">
						<Link href={article.href}>{article.title}</Link>
					</Heading>
					{article.excerpt ? <Text>{article.excerpt}</Text> : null}
					<Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
						{article.publishedAt ? (
							<Typography variant="caption" color="text.secondary" component="time">
								{article.publishedAt}
							</Typography>
						) : null}
						{typeof article.readingMinutes === "number" ? (
							<ReadingTime minutes={article.readingMinutes} />
						) : null}
					</Stack>
				</Stack>
			</CardContent>
			{article.tags?.length ? (
				<CardActions>
					<Stack direction="row" spacing={1} flexWrap="wrap">
						{article.tags.slice(0, 3).map((tag) => (
							<Chip key={tag} size="small" label={`#${tag}`} />
						))}
					</Stack>
				</CardActions>
			) : null}
		</Card>
	);
}
