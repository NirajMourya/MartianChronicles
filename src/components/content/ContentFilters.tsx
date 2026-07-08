import { Chip } from "@/components/ui";
import { Stack } from "@/components/ui";

export interface ContentFiltersProps {
	readonly active?: string;
	readonly items: readonly { label: string; href: string; count?: number }[];
}

export function ContentFilters({ active, items }: ContentFiltersProps) {
	return (
		<Stack direction="row" spacing={1} flexWrap="wrap">
			{items.map((item) => (
				<Chip
					key={item.href}
					component="a"
					href={item.href}
					label={item.count ? `${item.label} (${item.count})` : item.label}
					color={active === item.label ? "primary" : "default"}
					variant={active === item.label ? "filled" : "outlined"}
				/>
			))}
		</Stack>
	);
}
