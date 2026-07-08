import type { Metadata } from "next";

import { DiscoveryPageShell } from "@/components/content";
import { SearchBar } from "@/components/search";
import { seoDefaults, siteMetadata } from "@/config";

export const metadata: Metadata = {
	title: "Search",
	description: "Search articles and knowledge entries across Martian Chronicles.",
	alternates: {
		canonical: `${siteMetadata.domain}/search`,
	},
	openGraph: {
		title: `Search | ${siteMetadata.name}`,
		description: "Fast static search with filters for tags, categories, topics, technologies, series, and content type.",
		url: `${siteMetadata.domain}/search`,
		type: seoDefaults.openGraph.type,
	},
};

export default function SearchPage() {
	return (
		<DiscoveryPageShell
			title="Search"
			description="Find articles and knowledge entries instantly with weighted relevance and precise filters."
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
			eyebrow="Discovery"
		>
			<SearchBar autoFocus limit={30} />
		</DiscoveryPageShell>
	);
}
