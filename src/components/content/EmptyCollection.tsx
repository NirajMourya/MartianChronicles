import { Heading, Text } from "@/components/shared";
import { Button, Stack, Surface } from "@/components/ui";

export interface EmptyCollectionProps {
	readonly title: string;
	readonly description: string;
	readonly actionLabel?: string;
	readonly actionHref?: string;
}

export function EmptyCollection({ title, description, actionLabel, actionHref }: EmptyCollectionProps) {
	return (
		<Surface sx={{ p: { xs: 3, md: 4 } }}>
			<Stack spacing={2}>
				<Heading level={2} variant="h4" component="h2">
					{title}
				</Heading>
				<Text>{description}</Text>
				{actionLabel && actionHref ? (
					<Button component="a" href={actionHref} variant="outlined">
						{actionLabel}
					</Button>
				) : null}
			</Stack>
		</Surface>
	);
}
