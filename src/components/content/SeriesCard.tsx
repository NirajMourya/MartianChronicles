import CardContent from "@mui/material/CardContent";

import { Heading, Link, Text } from "@/components/shared";
import { Card, Chip, Stack } from "@/components/ui";

export interface SeriesCardProps {
	readonly title: string;
	readonly href: string;
	readonly description: string;
	readonly count: number;
	readonly readingTimeMinutes: number;
}

export function SeriesCard({ title, href, description, count, readingTimeMinutes }: SeriesCardProps) {
	return (
		<Card component="article">
			<CardContent>
				<Stack spacing={1.5}>
					<Stack direction="row" spacing={1} flexWrap="wrap">
						<Chip label={`${count} parts`} size="small" color="primary" />
						<Chip label={`${readingTimeMinutes} min total`} size="small" variant="outlined" />
					</Stack>
					<Heading level={3} variant="h5" component="h2">
						<Link href={href}>{title}</Link>
					</Heading>
					<Text>{description}</Text>
				</Stack>
			</CardContent>
		</Card>
	);
}
