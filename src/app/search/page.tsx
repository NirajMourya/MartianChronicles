import type { Metadata } from "next";

import { DiscoveryPageShell } from "@/components/content";
import { StructuredData } from "@/components/shared";
import { SearchBar } from "@/components/search";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
	title: "Search",
	description: "Search articles and knowledge entries across Martian Chronicles.",
	path: "/search",
});

export default function SearchPage() {
	const webPageJsonLd = buildWebPageJsonLd(
		"Search",
		"Search articles and knowledge entries across Martian Chronicles.",
		"/search",
	);

	return (
		<>
			<StructuredData id="jsonld-search-page" data={webPageJsonLd} />
			<DiscoveryPageShell
				title="Search"
				description="Find articles and knowledge entries instantly with weighted relevance and precise filters."
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
				eyebrow="Discovery"
			>
				<SearchBar autoFocus limit={30} />
			</DiscoveryPageShell>
		</>
	);
}
