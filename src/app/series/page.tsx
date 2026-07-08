import type { Metadata } from "next";

import { SeriesCard } from "@/components/content/SeriesCard";
import { DiscoveryPageShell } from "@/components/content/DiscoveryPageShell";
import { siteMetadata } from "@/config";
import { getSeries } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Series",
		description: "Browse article series.",
		alternates: { canonical: `${siteMetadata.domain}/series` },
	};
}

export default function SeriesIndexPage() {
	const series = getSeries({ includeDrafts: false });

	return (
		<DiscoveryPageShell
			title="Series"
			description="Multi-part writing and ordered learning paths."
			articleCount={series.length}
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Series" }]}
		>
			{series.map((item) => (
				<SeriesCard key={item.slug} title={item.title} href={item.url} description={item.description} count={item.parts.length} readingTimeMinutes={item.parts.length * 8} />
			))}
		</DiscoveryPageShell>
	);
}
