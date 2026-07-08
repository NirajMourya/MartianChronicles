import type { MetadataRoute } from "next";

import { siteMetadata, sitemapConfig } from "@/config";
import {
	getAllCategories,
	getAllTags,
	getAllTopics,
	getArticles,
	getSeries,
} from "@/lib/content";

const basePriority = sitemapConfig.defaultPriority;

const toAbsolute = (path: string) => `${siteMetadata.domain}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();
	const entries: MetadataRoute.Sitemap = [
		{
			url: toAbsolute("/"),
			lastModified: now,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: toAbsolute("/articles"),
			lastModified: now,
			changeFrequency: "weekly",
			priority: basePriority,
		},
		{
			url: toAbsolute("/tags"),
			lastModified: now,
			changeFrequency: "weekly",
			priority: basePriority - 0.1,
		},
		{
			url: toAbsolute("/topics"),
			lastModified: now,
			changeFrequency: "weekly",
			priority: basePriority - 0.1,
		},
		{
			url: toAbsolute("/categories"),
			lastModified: now,
			changeFrequency: "weekly",
			priority: basePriority - 0.1,
		},
		{
			url: toAbsolute("/series"),
			lastModified: now,
			changeFrequency: "weekly",
			priority: basePriority - 0.1,
		},
		{
			url: toAbsolute("/search"),
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.4,
		},
	];

	const articles = getArticles({ includeDrafts: false });
	for (const article of articles) {
		entries.push({
			url: toAbsolute(article.url),
			lastModified: article.updatedDate ? new Date(article.updatedDate) : new Date(article.publishedDate ?? now),
			changeFrequency: "monthly",
			priority: basePriority,
		});
	}

	for (const tag of getAllTags({ includeDrafts: false })) {
		entries.push({
			url: toAbsolute(`/tags/${encodeURIComponent(tag.value)}`),
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.55,
		});
	}

	for (const topic of getAllTopics({ includeDrafts: false })) {
		entries.push({
			url: toAbsolute(`/topics/${encodeURIComponent(topic.value)}`),
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.55,
		});
	}

	for (const category of getAllCategories({ includeDrafts: false })) {
		entries.push({
			url: toAbsolute(`/categories/${encodeURIComponent(category.value)}`),
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.55,
		});
	}

	for (const series of getSeries({ includeDrafts: false })) {
		entries.push({
			url: toAbsolute(`/series/${series.slug}`),
			lastModified: series.updatedDate ? new Date(series.updatedDate) : now,
			changeFrequency: "weekly",
			priority: 0.55,
		});
	}

	const archiveKeys = new Set<string>();
	for (const article of articles) {
		const dateValue = article.publishedDate ?? article.updatedDate;
		if (!dateValue) {
			continue;
		}
		const date = new Date(dateValue);
		if (Number.isNaN(date.getTime())) {
			continue;
		}
		const year = String(date.getFullYear());
		const month = String(date.getMonth() + 1).padStart(2, "0");
		archiveKeys.add(`${year}/${month}`);
	}

	for (const archiveKey of archiveKeys) {
		entries.push({
			url: toAbsolute(`/archive/${archiveKey}`),
			lastModified: now,
			changeFrequency: "monthly",
			priority: 0.45,
		});
	}

	return entries;
}
