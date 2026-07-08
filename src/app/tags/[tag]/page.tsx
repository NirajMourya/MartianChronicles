import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentList, DiscoveryPageShell, EmptyCollection, Pagination } from "@/components/content";
import { seoDefaults, siteMetadata } from "@/config";
import { getArticlesByTag, getAllTags } from "@/lib/content";
import {
	paginateCollection,
	resolvePageNumber,
	type DiscoverySearchParams,
} from "@/lib/content/discoveryPagination";

const pageSize = 9;

export const dynamicParams = false;

export async function generateStaticParams() {
	return getAllTags({ includeDrafts: false }).map((tag) => ({ tag: tag.value }));
}

export async function generateMetadata({ params }: { readonly params: Promise<{ tag: string }> }): Promise<Metadata> {
	const { tag } = await params;
	const articles = getArticlesByTag(tag);

	if (!articles.length) {
		return { title: seoDefaults.defaultTitle, description: seoDefaults.defaultDescription };
	}

	return {
		title: `${tag} Articles`,
		description: `Browse ${articles.length} articles tagged with ${tag}.`,
		alternates: { canonical: `${siteMetadata.domain}/tags/${tag}` },
	};
}

export default async function TagPage({
	params,
	searchParams,
}: {
	readonly params: Promise<{ tag: string }>;
	readonly searchParams?: Promise<DiscoverySearchParams>;
}) {
	const { tag } = await params;
	const resolvedSearchParams = searchParams ? await searchParams : undefined;
	const articles = getArticlesByTag(tag);

	if (!articles.length) {
		notFound();
	}

	const pageCount = Math.max(1, Math.ceil(articles.length / pageSize));
	const page = resolvePageNumber(resolvedSearchParams, pageCount);
	const latest = paginateCollection(articles, page, pageSize);

	return (
		<DiscoveryPageShell
			title={tag}
			description={`Latest articles tagged ${tag}.`}
			articleCount={articles.length}
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tags", href: "/tags" }, { label: tag }]}
		>
			{latest.length ? (
				<ContentList
					items={latest.map((article) => ({
						title: article.title,
						href: article.url,
						excerpt: article.excerpt,
						publishedAt: article.publishedDate,
						readingMinutes: article.readingTimeMinutes,
						tags: article.tags,
					}))}
				/>
			) : (
				<EmptyCollection title="No articles" description="No articles are tagged with this term yet." />
			)}
			<Pagination page={page} pageCount={pageCount} basePath={`/tags/${tag}`} />
		</DiscoveryPageShell>
	);
}
