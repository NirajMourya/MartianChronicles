import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArchiveTimeline, DiscoveryPageShell, EmptyCollection, Pagination } from "@/components/content";
import { siteMetadata } from "@/config";
import { getArticlesByArchive, getArticles } from "@/lib/content";
import {
	paginateCollection,
	resolvePageNumber,
	type DiscoverySearchParams,
} from "@/lib/content/discoveryPagination";

const pageSize = 12;

export const dynamicParams = false;

export async function generateStaticParams() {
	const articles = getArticles({ includeDrafts: false });
	const entries = new Map<string, { year: string; month: string }>();

	for (const article of articles) {
		const dateValue = article.publishedDate ?? article.updatedDate;
		if (!dateValue) continue;
		const date = new Date(dateValue);
		if (Number.isNaN(date.getTime())) continue;
		const year = String(date.getFullYear());
		const month = String(date.getMonth() + 1).padStart(2, "0");
		entries.set(`${year}-${month}`, { year, month });
	}

	return [...entries.values()];
}

export async function generateMetadata({ params }: { readonly params: Promise<{ year: string; month: string }> }): Promise<Metadata> {
	const { year, month } = await params;

	return {
		title: `${year}-${month} Archive`,
		description: `Browse articles published in ${year}-${month}.`,
		alternates: { canonical: `${siteMetadata.domain}/archive/${year}/${month}` },
	};
}

export default async function ArchiveMonthPage({
	params,
	searchParams,
}: {
	readonly params: Promise<{ year: string; month: string }>;
	readonly searchParams?: Promise<DiscoverySearchParams>;
}) {
	const { year, month } = await params;
	const resolvedSearchParams = searchParams ? await searchParams : undefined;
	const articles = getArticlesByArchive(year, month);

	if (!articles.length) {
		notFound();
	}

	const pageCount = Math.max(1, Math.ceil(articles.length / pageSize));
	const page = resolvePageNumber(resolvedSearchParams, pageCount);
	const visibleArticles = paginateCollection(articles, page, pageSize);

	return (
		<DiscoveryPageShell
			title={`${year}-${month}`}
			description={`Articles published in ${year}-${month}.`}
			articleCount={articles.length}
			breadcrumbs={[{ label: "Home", href: "/" }, { label: "Archive" }, { label: `${year}-${month}` }]}
		>
			{visibleArticles.length ? (
				<ArchiveTimeline
					items={visibleArticles.map((article) => ({
						title: article.title,
						href: article.url,
						excerpt: article.excerpt,
						publishedAt: article.publishedDate,
						readingMinutes: article.readingTimeMinutes,
						tags: article.tags,
					}))}
				/>
			) : (
				<EmptyCollection title="No articles" description="No articles were published in this month." />
			)}
			<Pagination
				page={page}
				pageCount={pageCount}
				basePath={`/archive/${year}/${month}`}
			/>
		</DiscoveryPageShell>
	);
}
