import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleLayout } from "@/components/article";
import { MDXProvider } from "@/components/mdx";
import { seoDefaults, siteMetadata } from "@/config";
import { getArticleBySlug, getArticles, getRelatedContent } from "@/lib/content";

interface ArticlePageParams {
	readonly slug: string;
}

const resolveArticleForParam = (slugParam: string) => {
	const exact = getArticleBySlug(slugParam, { includeDrafts: false });
	if (exact) {
		return exact;
	}

	const allArticles = getArticles({ includeDrafts: false });
	return allArticles.find((entry) => entry.slug.split("/").at(-1) === slugParam) ?? null;
};

export const dynamicParams = false;

export async function generateStaticParams() {
	const articles = getArticles({ includeDrafts: false });
	return articles.map((article) => ({ slug: article.slug.split("/").at(-1) ?? article.slug }));
}

export async function generateMetadata({
	params,
}: {
	readonly params: Promise<ArticlePageParams>;
}): Promise<Metadata> {
	const { slug } = await params;
	const article = resolveArticleForParam(slug);

	if (!article) {
		return {
			title: seoDefaults.defaultTitle,
			description: seoDefaults.defaultDescription,
		};
	}

	const title = article.title;
	const description = article.description;
	const canonical = article.canonicalUrl ?? `${siteMetadata.domain}${article.url}`;

	return {
		title,
		description,
		keywords: [...new Set([...seoDefaults.keywords, ...article.tags, ...article.topics])],
		alternates: {
			canonical,
		},
		openGraph: {
			title,
			description,
			url: canonical,
			type: "article",
			siteName: seoDefaults.openGraph.siteName,
			locale: seoDefaults.openGraph.locale,
			images: [
				{
					url: article.ogImage ?? seoDefaults.openGraph.defaultImage.url,
					width: seoDefaults.openGraph.defaultImage.width,
					height: seoDefaults.openGraph.defaultImage.height,
					alt: article.coverAlt ?? title,
				},
			],
		},
		twitter: {
			card: seoDefaults.twitter.card,
			title,
			description,
			images: [article.ogImage ?? seoDefaults.openGraph.defaultImage.url],
		},
	};
}

export default async function ArticlePage({
	params,
}: {
	readonly params: Promise<ArticlePageParams>;
}) {
	const { slug } = await params;
	const article = resolveArticleForParam(slug);

	if (!article) {
		notFound();
	}

	const allArticles = getArticles({ includeDrafts: false });
	const articleIndex = allArticles.findIndex((entry) => entry.slug === article.slug);
	const previousArticle = articleIndex < allArticles.length - 1 ? allArticles[articleIndex + 1] : null;
	const nextArticle = articleIndex > 0 ? allArticles[articleIndex - 1] : null;
	const related = getRelatedContent({
		collection: "articles",
		slug: article.slug,
		includeDrafts: false,
		limit: 3,
	}).map((entry) => ({
		title: entry.title,
		href: entry.url,
	}));

	return (
		<ArticleLayout
			article={article}
			previousArticle={
				previousArticle
					? {
							title: previousArticle.title,
							href: previousArticle.url,
						}
					: undefined
			}
			nextArticle={
				nextArticle
					? {
							title: nextArticle.title,
							href: nextArticle.url,
						}
					: undefined
			}
			relatedArticles={related}
		>
			<MDXProvider source={article.body} />
		</ArticleLayout>
	);
}
