import type { Metadata } from "next";

import { DiscoveryPageShell } from "@/components/content/DiscoveryPageShell";
import { TagCloud } from "@/components/content/TagCloud";
import { siteMetadata } from "@/config";
import { getAllTopics } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Topics",
		description: "Browse article topics.",
		alternates: { canonical: `${siteMetadata.domain}/topics` },
	};
}

export default function TopicsIndexPage() {
	const topics = getAllTopics({ includeDrafts: false });

	return (
		<DiscoveryPageShell
			title="Topics"
			description="Browse the archive by topic cluster."
			articleCount={topics.reduce((total, item) => total + item.count, 0)}
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Topics" }]}
		>
			<TagCloud tags={topics.map((topic) => ({ label: topic.value, href: `/topics/${topic.value}`, count: topic.count }))} />
		</DiscoveryPageShell>
	);
}
