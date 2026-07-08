import type { ReactNode } from "react";

import { Heading, Link, Text } from "@/components/shared";
import { PageContainer } from "@/components/layout";
import { Chip, Section, Stack, Surface } from "@/components/ui";

import type { ContentBreadcrumbItem } from "./types";

export interface DiscoveryPageShellProps {
	readonly title: string;
	readonly description: string;
	readonly articleCount?: number;
	readonly breadcrumbs: readonly ContentBreadcrumbItem[];
	readonly children: ReactNode;
	readonly eyebrow?: string;
}

export function DiscoveryPageShell({
	title,
	description,
	articleCount,
	breadcrumbs,
	children,
	eyebrow,
}: DiscoveryPageShellProps) {
	return (
		<Section as="section" sx={{ pt: { xs: 6, md: 9 } }}>
			<PageContainer>
				<Stack spacing={3.5}>
					<Stack spacing={1.5}>
						{breadcrumbs.length > 0 ? (
							<Stack direction="row" spacing={1} flexWrap="wrap" component="nav" aria-label="Breadcrumbs">
								{breadcrumbs.map((crumb, index) => (
									<Stack key={crumb.label} direction="row" spacing={1} alignItems="center" component="span">
										{index > 0 ? <Text component="span" color="text.secondary">/</Text> : null}
										{crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <Text component="span" color="text.primary">{crumb.label}</Text>}
									</Stack>
								))}
							</Stack>
						) : null}
						{eyebrow ? <Text variant="overline" color="primary.main">{eyebrow}</Text> : null}
						<Heading level={1}>{title}</Heading>
						<Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
							<Text component="p">{description}</Text>
							{typeof articleCount === "number" ? <Chip label={`${articleCount} articles`} color="primary" size="small" /> : null}
						</Stack>
					</Stack>
					<Surface sx={{ p: { xs: 2, md: 3 } }}>{children}</Surface>
				</Stack>
			</PageContainer>
		</Section>
	);
}
