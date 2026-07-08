import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleSeriesItem } from "@/components/article/ArticleSeriesItem";
import { DiscoveryPageShell, EmptyCollection, Pagination } from "@/components/content";
import { Text } from "@/components/shared";
import { Stack } from "@/components/ui";
import { seoDefaults, siteMetadata } from "@/config";
import { getSeries, getArticlesBySeries } from "@/lib/content";
import {
	paginateCollection,
	resolvePageNumber,
	type DiscoverySearchParams,
} from "@/lib/content/discoveryPagination";

const pageSize = 8;

export const dynamicParams = false;

export async function generateStaticParams() {
	return getSeries({ includeDrafts: false }).map((series) => ({ series: series.slug }));
}

export async function generateMetadata({ params }: { readonly params: Promise<{ series: string }> }): Promise<Metadata> {
	const { series } = await params;
	const seriesEntries = getSeries({ includeDrafts: false });
	const currentSeries = seriesEntries.find((entry) => entry.slug === series || entry.title === series);

	if (!currentSeries) {
		return { title: seoDefaults.defaultTitle, description: seoDefaults.defaultDescription };
	}

	return {
		title: currentSeries.title,
		description: currentSeries.description,
		alternates: { canonical: `${siteMetadata.domain}/series/${currentSeries.slug}` },
	};
}

export default async function SeriesPage({
	params,
	searchParams,
}: {
	readonly params: Promise<{ series: string }>;
	readonly searchParams?: Promise<DiscoverySearchParams>;
}) {
	const { series } = await params;
	const resolvedSearchParams = searchParams ? await searchParams : undefined;
	const currentSeries = getSeries({ includeDrafts: false }).find((entry) => entry.slug === series || entry.title === series);

	if (!currentSeries) {
		notFound();
	}

	const articles = getArticlesBySeries(currentSeries.slug);
	const orderedArticles = [...articles].sort((a, b) => {
		const aOrder = a.seriesOrder ?? Number.POSITIVE_INFINITY;
		const bOrder = b.seriesOrder ?? Number.POSITIVE_INFINITY;
		const aPublishedDate = a.publishedDate ?? a.updatedDate ?? "";
		const bPublishedDate = b.publishedDate ?? b.updatedDate ?? "";

		if (aOrder !== bOrder) {
			return aOrder - bOrder;
		}

		return bPublishedDate.localeCompare(aPublishedDate);
	});
	const totalReadingTime = orderedArticles.reduce((sum, article) => sum + article.readingTimeMinutes, 0);
	const pageCount = Math.max(1, Math.ceil(orderedArticles.length / pageSize));
	const page = resolvePageNumber(resolvedSearchParams, pageCount);
	const visibleArticles = paginateCollection(orderedArticles, page, pageSize);

	return (
		<DiscoveryPageShell
			title={currentSeries.title}
			description={`Ordered learning path for ${currentSeries.title}.`}
			articleCount={articles.length}
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Series", href: "/series" }, { label: currentSeries.title }]}
		>
			<Stack spacing={2.5}>
				<Text>{currentSeries.description}</Text>
				<Text as="p">Estimated total reading time: {totalReadingTime} min</Text>
				<div aria-hidden style={{ border: "1px dashed currentColor", borderRadius: 8, padding: 12 }}>
					Progress indicator placeholder
				</div>
				{visibleArticles.length ? (
					visibleArticles.map((article, index) => (
						<ArticleSeriesItem
							key={article.slug}
							article={{
								title: article.title,
								href: article.url,
								excerpt: article.excerpt,
								publishedAt: article.publishedDate,
								readingMinutes: article.readingTimeMinutes,
								tags: article.tags,
							}}
							index={(page - 1) * pageSize + index + 1}
							total={orderedArticles.length}
							seriesTitle={currentSeries.title}
						/>
					))
				) : (
					<EmptyCollection title="No articles" description="This series has no published articles yet." />
				)}
				<Pagination page={page} pageCount={pageCount} basePath={`/series/${currentSeries.slug}`} />
			</Stack>
		</DiscoveryPageShell>
	);
}
