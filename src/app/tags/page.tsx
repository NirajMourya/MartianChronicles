import type { Metadata } from "next";

import { TagCloud } from "@/components/content/TagCloud";
import { DiscoveryPageShell } from "@/components/content/DiscoveryPageShell";
import { seoDefaults, siteMetadata } from "@/config";
import { getAllTags } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Tags",
		description: "Browse articles by tag.",
		alternates: { canonical: `${siteMetadata.domain}/tags` },
		openGraph: {
			title: "Tags",
			description: "Browse articles by tag.",
			url: `${siteMetadata.domain}/tags`,
			type: "website",
			siteName: seoDefaults.openGraph.siteName,
			locale: seoDefaults.openGraph.locale,
			images: [seoDefaults.openGraph.defaultImage],
		},
	};
}

export default function TagsIndexPage() {
	const tags = getAllTags({ includeDrafts: false });

	return (
		<DiscoveryPageShell
			title="Tags"
			description="Browse the article archive by topic tag."
			articleCount={tags.reduce((total, item) => total + item.count, 0)}
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tags" }]}
		>
			<TagCloud tags={tags.map((tag) => ({ label: tag.value, href: `/tags/${tag.value}`, count: tag.count }))} />
		</DiscoveryPageShell>
	);
}
