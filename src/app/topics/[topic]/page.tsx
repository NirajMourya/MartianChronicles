import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentList, DiscoveryPageShell, EmptyCollection, Pagination } from "@/components/content";
import { seoDefaults, siteMetadata } from "@/config";
import { getAllTopics, getArticlesByTopic } from "@/lib/content";
import {
	paginateCollection,
	resolvePageNumber,
	type DiscoverySearchParams,
} from "@/lib/content/discoveryPagination";

const pageSize = 9;

export const dynamicParams = false;

export async function generateStaticParams() {
	return getAllTopics({ includeDrafts: false }).map((topic) => ({ topic: topic.value }));
}

export async function generateMetadata({ params }: { readonly params: Promise<{ topic: string }> }): Promise<Metadata> {
	const { topic } = await params;
	const articles = getArticlesByTopic(topic);

	if (!articles.length) {
		return { title: seoDefaults.defaultTitle, description: seoDefaults.defaultDescription };
	}

	return {
		title: `${topic} Topics`,
		description: `Browse ${articles.length} articles in the ${topic} topic cluster.`,
		alternates: { canonical: `${siteMetadata.domain}/topics/${topic}` },
	};
}

export default async function TopicPage({
	params,
	searchParams,
}: {
	readonly params: Promise<{ topic: string }>;
	readonly searchParams?: Promise<DiscoverySearchParams>;
}) {
	const { topic } = await params;
	const resolvedSearchParams = searchParams ? await searchParams : undefined;
	const articles = getArticlesByTopic(topic);

	if (!articles.length) {
		notFound();
	}

	const pageCount = Math.max(1, Math.ceil(articles.length / pageSize));
	const page = resolvePageNumber(resolvedSearchParams, pageCount);
	const paginatedArticles = paginateCollection(articles, page, pageSize);

	return (
		<DiscoveryPageShell
			title={topic}
			description={`Articles grouped under ${topic}.`}
			articleCount={articles.length}
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Topics", href: "/topics" }, { label: topic }]}
		>
			{paginatedArticles.length ? (
				<ContentList
					items={paginatedArticles.map((article) => ({
						title: article.title,
						href: article.url,
						excerpt: article.excerpt,
						publishedAt: article.publishedDate,
						readingMinutes: article.readingTimeMinutes,
						tags: article.tags,
					}))}
				/>
			) : (
				<EmptyCollection title="No articles" description="No articles are assigned to this topic yet." />
			)}
			<Pagination page={page} pageCount={pageCount} basePath={`/topics/${topic}`} />
		</DiscoveryPageShell>
	);
}
