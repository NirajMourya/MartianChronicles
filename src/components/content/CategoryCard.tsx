import CardContent from "@mui/material/CardContent";

import { Heading, Link, Text } from "@/components/shared";
import { Card, Chip, Stack } from "@/components/ui";

export interface CategoryCardProps {
	readonly title: string;
	readonly href: string;
	readonly description: string;
	readonly count: number;
}

export function CategoryCard({ title, href, description, count }: CategoryCardProps) {
	return (
		<Card component="article">
			<CardContent>
				<Stack spacing={1.5}>
					<Chip label={`${count} articles`} size="small" color="primary" />
					<Heading level={3} variant="h5" component="h2">
						<Link href={href}>{title}</Link>
					</Heading>
					<Text>{description}</Text>
				</Stack>
			</CardContent>
		</Card>
	);
}
