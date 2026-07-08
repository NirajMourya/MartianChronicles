import type { Metadata } from "next";

import { DiscoveryPageShell, Pagination, ContentGrid } from "@/components/content";
import { Heading, Link, StructuredData, Text } from "@/components/shared";
import { Stack } from "@/components/ui";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";
import { getArticles, getFeaturedArticles, getRecentArticles } from "@/lib/content";
import {
	paginateCollection,
	resolvePageNumber,
	type DiscoverySearchParams,
} from "@/lib/content/discoveryPagination";

const pageSize = 9;

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
	return buildPageMetadata({
		title: "Articles",
		description: "Browse all articles in the Martian Chronicles archive.",
		path: "/articles",
	});
}

export default async function ArticlesIndexPage({
	searchParams,
}: {
	readonly searchParams?: Promise<DiscoverySearchParams>;
}) {
	const resolvedSearchParams = searchParams ? await searchParams : undefined;
	const articles = getArticles({ includeDrafts: false });
	const featured = getFeaturedArticles(3);
	const recent = getRecentArticles(3);
	const articleCount = articles.length;
	const webPageJsonLd = buildWebPageJsonLd(
		"Articles",
		"Browse all articles in the Martian Chronicles archive.",
		"/articles",
	);
	const pageCount = Math.max(1, Math.ceil(articleCount / pageSize));
	const page = resolvePageNumber(resolvedSearchParams, pageCount);
	const paginatedArticles = paginateCollection(articles, page, pageSize);

	return (
		<>
			<StructuredData id="jsonld-articles-page" data={webPageJsonLd} />
			<DiscoveryPageShell
				title="Articles"
				description="Long-form writing, engineering notes, and connected ideas."
				articleCount={articleCount}
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Articles" }]}
			>
				<Stack spacing={3}>
					<ContentGrid
						items={paginatedArticles.map((article) => ({
							title: article.title,
							href: article.url,
							excerpt: article.excerpt,
							publishedAt: article.publishedDate,
							readingMinutes: article.readingTimeMinutes,
							tags: article.tags,
						}))}
					/>
					<Stack spacing={2}>
						<Heading level={2} variant="h5" component="h2">
							Featured
						</Heading>
						{featured.length > 0 ? (
							<ContentGrid
								items={featured.map((article) => ({
									title: article.title,
									href: article.url,
									excerpt: article.excerpt,
									publishedAt: article.publishedDate,
									readingMinutes: article.readingTimeMinutes,
									tags: article.tags,
									featured: article.featured,
								}))}
							/>
						) : (
							<Text>No featured articles yet.</Text>
						)}
					</Stack>
					<Stack spacing={2}>
						<Heading level={2} variant="h5" component="h2">
							Recent
						</Heading>
						{recent.length > 0 ? (
							<ContentGrid
								items={recent.map((article) => ({
									title: article.title,
									href: article.url,
									excerpt: article.excerpt,
									publishedAt: article.publishedDate,
									readingMinutes: article.readingTimeMinutes,
									tags: article.tags,
									featured: article.featured,
								}))}
							/>
						) : (
							<Text>No recent articles yet.</Text>
						)}
					</Stack>
					<Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
						<Text variant="body2" color="text.secondary">
							Page {page} of {pageCount}
						</Text>
						<Pagination page={page} pageCount={pageCount} basePath="/articles" />
					</Stack>
					<Link href="/tags">Explore by tags</Link>
				</Stack>
			</DiscoveryPageShell>
		</>
	);
}
