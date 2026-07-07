"use client";

import StarRounded from "@mui/icons-material/StarRounded";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { Heading, Link, Text } from "../shared";
import { Badge, Card, Chip, Stack } from "../ui";

import type { ArticleCardData } from "./types";
import { ReadingTime } from "./ReadingTime";

export interface FeaturedArticleCardProps {
	readonly article: ArticleCardData;
}

/**
 * Emphasized article card variant for featured content.
 */
export function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
	return (
		<Card
			component="article"
			sx={{
				borderColor: "primary.main",
				background: "linear-gradient(180deg, transparent 0%, rgba(255,90,31,0.05) 100%)",
			}}
		>
			<CardContent>
				<Stack spacing={1.5}>
					<Badge
						badgeContent={<StarRounded fontSize="small" />}
						color="primary"
						anchorOrigin={{ vertical: "top", horizontal: "right" }}
					>
						<Heading level={2} variant="h4" component="h2">
							<Link href={article.href}>{article.title}</Link>
						</Heading>
					</Badge>
					{article.excerpt ? <Text>{article.excerpt}</Text> : null}
					{typeof article.readingMinutes === "number" ? (
						<ReadingTime minutes={article.readingMinutes} />
					) : null}
				</Stack>
			</CardContent>
			{article.tags?.length ? (
				<CardActions>
					<Stack direction="row" spacing={1} flexWrap="wrap">
						{article.tags.slice(0, 4).map((tag) => (
							<Chip key={tag} size="small" label={`#${tag}`} color="primary" />
						))}
					</Stack>
				</CardActions>
			) : null}
		</Card>
	);
}
