import { Chip } from "@/components/ui";
import { Stack } from "@/components/ui";

export interface TagCloudProps {
	readonly tags: readonly { label: string; href: string; count: number }[];
}

export function TagCloud({ tags }: TagCloudProps) {
	return (
		<Stack direction="row" spacing={1} flexWrap="wrap">
			{tags.map((tag) => (
				<Chip key={tag.href} component="a" href={tag.href} label={`${tag.label} (${tag.count})`} />
			))}
		</Stack>
	);
}
