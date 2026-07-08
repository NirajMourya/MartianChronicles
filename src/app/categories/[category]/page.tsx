import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleCard, FeaturedArticleCard } from "@/components/article";
import { ContentFilters, DiscoveryPageShell, EmptyCollection, Pagination } from "@/components/content";
import { Text } from "@/components/shared";
import { Stack } from "@/components/ui";
import { seoDefaults, siteMetadata } from "@/config";
import { getAllCategories, getArticlesByCategory } from "@/lib/content";
import {
	paginateCollection,
	resolvePageNumber,
	type DiscoverySearchParams,
} from "@/lib/content/discoveryPagination";

const pageSize = 9;

export const dynamicParams = false;

export async function generateStaticParams() {
	return getAllCategories({ includeDrafts: false }).map((category) => ({ category: category.value }));
}

export async function generateMetadata({ params }: { readonly params: Promise<{ category: string }> }): Promise<Metadata> {
	const { category } = await params;
	const articles = getArticlesByCategory(category);

	if (!articles.length) {
		return { title: seoDefaults.defaultTitle, description: seoDefaults.defaultDescription };
	}

	return {
		title: `${category} Articles`,
		description: `Browse ${articles.length} articles in ${category}.`,
		alternates: { canonical: `${siteMetadata.domain}/categories/${category}` },
	};
}

export default async function CategoryPage({
	params,
	searchParams,
}: {
	readonly params: Promise<{ category: string }>;
	readonly searchParams?: Promise<DiscoverySearchParams>;
}) {
	const { category } = await params;
	const resolvedSearchParams = searchParams ? await searchParams : undefined;
	const articles = getArticlesByCategory(category);

	if (!articles.length) {
		notFound();
	}

	const featuredArticle = articles.find((article) => article.featured) ?? articles[0];
	const latestArticles = articles.filter((article) => article.slug !== featuredArticle.slug);
	const pageCount = Math.max(1, Math.ceil(latestArticles.length / pageSize));
	const page = resolvePageNumber(resolvedSearchParams, pageCount);
	const paginatedLatestArticles = paginateCollection(latestArticles, page, pageSize);

	return (
		<DiscoveryPageShell
			title={category}
			description={`Curated writing in the ${category} category.`}
			articleCount={articles.length}
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories", href: "/categories" }, { label: category }]}
		>
			<Stack spacing={2.5}>
				<Text>
					{category} includes practical notes, essays, and deep dives connected by a common editorial
					thread.
				</Text>
				<ContentFilters
					active={category}
					items={getAllCategories({ includeDrafts: false }).map((entry) => ({
						label: entry.value,
						href: `/categories/${entry.value}`,
						count: entry.count,
					}))}
				/>
				<FeaturedArticleCard
					article={{
						title: featuredArticle.title,
						href: featuredArticle.url,
						excerpt: featuredArticle.excerpt,
						publishedAt: featuredArticle.publishedDate,
						readingMinutes: featuredArticle.readingTimeMinutes,
						tags: featuredArticle.tags,
					}}
				/>
				{paginatedLatestArticles.length > 0 ? (
					paginatedLatestArticles.map((article) => (
						<ArticleCard
							key={article.slug}
							article={{
								title: article.title,
								href: article.url,
								excerpt: article.excerpt,
								publishedAt: article.publishedDate,
								readingMinutes: article.readingTimeMinutes,
								tags: article.tags,
							}}
						/>
					))
				) : (
					<EmptyCollection
						title="No latest articles"
						description="No additional articles are available in this category yet."
					/>
				)}
				<Pagination
					page={page}
					pageCount={pageCount}
					basePath={`/categories/${category}`}
				/>
			</Stack>
		</DiscoveryPageShell>
	);
}
