import "server-only";

import fs from "node:fs";
import path from "node:path";

import { format, isValid, parseISO } from "date-fns";
import fastGlob from "fast-glob";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import readingTime from "reading-time";
import remarkBreaks from "remark-breaks";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const contentRootDirectory = path.join(process.cwd(), "content");

const collectionSchema = z.enum([
	"articles",
	"notes",
	"projects",
	"resources",
	"series",
]);

export type ContentCollection = z.infer<typeof collectionSchema>;

const referenceSchema = z.object({
	title: z.string().min(1),
	url: z.url(),
});

const contentDateSchema = z.preprocess((value) => {
	if (value instanceof Date) {
		return value.toISOString();
	}
	return value;
}, z.string().datetime({ offset: true }).or(z.string().date()));

const baseFrontmatterSchema = z.object({
	title: z.string().min(1),
	slug: z.string().min(1).optional(),
	description: z.string().min(1),
	summary: z.string().min(1).optional(),
	publishedDate: contentDateSchema.optional(),
	updatedDate: contentDateSchema.optional(),
	tags: z.array(z.string().min(1)).default([]),
	topics: z.array(z.string().min(1)).default([]),
	category: z.string().min(1).optional(),
	series: z.string().min(1).optional(),
	author: z.string().min(1).default("niraj-mourya"),
	featured: z.boolean().default(false),
	draft: z.boolean().default(false),
	coverImage: z.string().min(1).optional(),
	coverAlt: z.string().min(1).optional(),
	ogImage: z.string().min(1).optional(),
	canonicalUrl: z.url().optional(),
	keywords: z.array(z.string().min(1)).default([]),
	difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
	technologies: z.array(z.string().min(1)).default([]),
	references: z.array(referenceSchema).default([]),
	relatedArticles: z.array(z.string().min(1)).default([]),
});

const articlesFrontmatterSchema = baseFrontmatterSchema.extend({
	contentType: z.literal("article").default("article"),
	articleType: z.enum(["technical", "personal"]).default("technical"),
	seriesOrder: z.number().int().positive().optional(),
	category: z.string().min(1),
	topics: z.array(z.string().min(1)).min(1),
	tags: z.array(z.string().min(1)).min(1),
});

const notesFrontmatterSchema = baseFrontmatterSchema.extend({
	contentType: z.literal("note").default("note"),
	topics: z.array(z.string().min(1)).min(1),
});

const projectsFrontmatterSchema = baseFrontmatterSchema.extend({
	contentType: z.literal("project").default("project"),
	status: z.enum(["planned", "active", "completed", "archived"]).default("active"),
	repositoryUrl: z.url().optional(),
	liveUrl: z.url().optional(),
	category: z.string().min(1),
});

const resourcesFrontmatterSchema = baseFrontmatterSchema.extend({
	contentType: z.literal("resource").default("resource"),
	resourceType: z
		.enum(["guide", "tool", "book", "course", "reference", "collection"])
		.default("collection"),
	category: z.string().min(1),
});

const seriesPartSchema = z.object({
	title: z.string().min(1),
	slug: z.string().min(1),
	collection: collectionSchema,
	order: z.number().int().positive(),
});

const seriesFrontmatterSchema = baseFrontmatterSchema.extend({
	contentType: z.literal("series").default("series"),
	seriesType: z.enum(["technical", "learning", "writing", "project"]).default("technical"),
	status: z.enum(["planned", "ongoing", "completed"]).default("ongoing"),
	parts: z.array(seriesPartSchema).default([]),
	category: z.string().min(1),
});

const frontmatterSchemas = {
	articles: articlesFrontmatterSchema,
	notes: notesFrontmatterSchema,
	projects: projectsFrontmatterSchema,
	resources: resourcesFrontmatterSchema,
	series: seriesFrontmatterSchema,
} as const;

type FrontmatterSchemaMap = typeof frontmatterSchemas;

export type ArticleFrontmatter = z.infer<typeof articlesFrontmatterSchema>;
export type NoteFrontmatter = z.infer<typeof notesFrontmatterSchema>;
export type ProjectFrontmatter = z.infer<typeof projectsFrontmatterSchema>;
export type ResourceFrontmatter = z.infer<typeof resourcesFrontmatterSchema>;
export type SeriesFrontmatter = z.infer<typeof seriesFrontmatterSchema>;

export type CollectionFrontmatterMap = {
	[K in keyof FrontmatterSchemaMap]: z.infer<FrontmatterSchemaMap[K]>;
};

export type ContentEntry<K extends ContentCollection = ContentCollection> =
	CollectionFrontmatterMap[K] & {
		readonly id: string;
		readonly collection: K;
		readonly slug: string;
		readonly sourcePath: string;
		readonly url: string;
		readonly body: string;
		readonly excerpt: string;
		readonly readingTimeMinutes: number;
		readonly wordCount: number;
	};

export interface ContentLoadOptions {
	readonly includeDrafts?: boolean;
	readonly limit?: number;
}

export const mdxRemarkPlugins = Object.freeze([remarkGfm, remarkBreaks, remarkDirective]);

export const mdxFeatureSupport = Object.freeze({
	gfm: true,
	tables: true,
	taskLists: true,
	footnotes: true,
	codeBlocks: true,
	images: true,
	calloutsFutureReady: true,
});

const urlPrefixMap: Readonly<Record<ContentCollection, string>> = Object.freeze({
	articles: "/articles",
	notes: "/notes",
	projects: "/projects",
	resources: "/resources",
	series: "/series",
});

const slugger = new GithubSlugger();

const normalizeSegment = (segment: string): string => {
	slugger.reset();
	return slugger.slug(segment.trim().toLowerCase());
};

/**
 * Generate a stable slug from file path or input string.
 * Nested folders are preserved in final slug paths.
 */
export const generateSlug = (input: string): string => {
	const normalized = input.replace(/\\/g, "/").replace(/\.mdx?$/i, "");
	return normalized
		.split("/")
		.filter(Boolean)
		.map(normalizeSegment)
		.join("/");
};

export const formatContentDate = (
	input: string | Date,
	pattern = "MMMM d, yyyy",
): string => {
	const date = typeof input === "string" ? parseISO(input) : input;
	if (!isValid(date)) {
		return typeof input === "string" ? input : "";
	}
	return format(date, pattern);
};

export const extractExcerpt = (rawBody: string, fallbackLength = 180): string => {
	const normalized = rawBody
		.replace(/```[\s\S]*?```/g, "")
		.replace(/[#>*_`\-]/g, "")
		.replace(/\[(.*?)\]\((.*?)\)/g, "$1")
		.replace(/\s+/g, " ")
		.trim();

	if (!normalized) {
		return "";
	}

	if (normalized.length <= fallbackLength) {
		return normalized;
	}

	return `${normalized.slice(0, fallbackLength).trimEnd()}...`;
};

export const sortByDateDesc = <T extends { publishedDate?: string; updatedDate?: string }>(
	items: readonly T[],
): T[] => {
	return [...items].sort((a, b) => {
		const aDate = a.publishedDate ?? a.updatedDate ?? "1970-01-01";
		const bDate = b.publishedDate ?? b.updatedDate ?? "1970-01-01";
		return new Date(bDate).getTime() - new Date(aDate).getTime();
	});
};

export const filterByCategory = <T extends { category?: string }>(
	items: readonly T[],
	category: string,
): T[] => items.filter((item) => item.category?.toLowerCase() === category.toLowerCase());

export const filterByTag = <T extends { tags: readonly string[] }>(
	items: readonly T[],
	tag: string,
): T[] => items.filter((item) => item.tags.some((entry) => entry.toLowerCase() === tag.toLowerCase()));

export const filterByTopic = <T extends { topics: readonly string[] }>(
	items: readonly T[],
	topic: string,
): T[] =>
	items.filter((item) => item.topics.some((entry) => entry.toLowerCase() === topic.toLowerCase()));

export const filterBySeries = <T extends { series?: string }>(
	items: readonly T[],
	series: string,
): T[] => items.filter((item) => item.series?.toLowerCase() === series.toLowerCase());

export const filterByMonth = <T extends { publishedDate?: string; updatedDate?: string }>(
	items: readonly T[],
	year: string,
	month: string,
): T[] =>
	items.filter((item) => {
		const dateValue = item.publishedDate ?? item.updatedDate;
		if (!dateValue) {
			return false;
		}

		const date = new Date(dateValue);
		if (Number.isNaN(date.getTime())) {
			return false;
		}

		return String(date.getFullYear()) === year && String(date.getMonth() + 1).padStart(2, "0") === month;
	});

const getCollectionDirectory = (collection: ContentCollection): string =>
	path.join(contentRootDirectory, collection);

const resolveEntrySlug = (frontmatterSlug: string | undefined, relativePath: string): string =>
	frontmatterSlug ? generateSlug(frontmatterSlug) : generateSlug(relativePath);

const buildEntryUrl = (collection: ContentCollection, slug: string): string =>
	`${urlPrefixMap[collection]}/${slug}`;

const validateFrontmatter = <K extends ContentCollection>(
	collection: K,
	data: unknown,
	sourcePath: string,
): CollectionFrontmatterMap[K] => {
	const parsed = frontmatterSchemas[collection].safeParse(data);

	if (!parsed.success) {
		const details = parsed.error.issues
			.map((issue) => `- ${issue.path.join(".") || "root"}: ${issue.message}`)
			.join("\n");
		throw new Error(
			`Invalid frontmatter in ${sourcePath} (${collection})\n${details}`,
		);
	}

	return parsed.data as CollectionFrontmatterMap[K];
};

const loadCollectionFilePaths = (collection: ContentCollection): string[] => {
	const collectionPath = getCollectionDirectory(collection);
	if (!fs.existsSync(collectionPath)) {
		return [];
	}

	return fastGlob.sync("**/*.mdx", {
		cwd: collectionPath,
		onlyFiles: true,
		absolute: false,
	});
};

const parseContentFile = <K extends ContentCollection>(
	collection: K,
	relativePath: string,
): ContentEntry<K> => {
	const absolutePath = path.join(getCollectionDirectory(collection), relativePath);
	const fileContent = fs.readFileSync(absolutePath, "utf8");
	const { data, content } = matter(fileContent);
	const frontmatter = validateFrontmatter(collection, data, absolutePath);
	const slug = resolveEntrySlug(frontmatter.slug, relativePath);
	const stats = readingTime(content);
	const excerpt = frontmatter.summary ?? extractExcerpt(content);

	return {
		...frontmatter,
		id: generateSlug(relativePath),
		collection,
		slug,
		sourcePath: absolutePath,
		url: buildEntryUrl(collection, slug),
		body: content,
		excerpt,
		readingTimeMinutes: Math.max(1, Math.round(stats.minutes)),
		wordCount: stats.words,
	};
};

const collectionCache = new Map<string, AnyContentEntry[]>();

const getCollectionCacheKey = (
	collection: ContentCollection,
	includeDrafts: boolean,
): string => `${collection}:${includeDrafts ? "with-drafts" : "published-only"}`;

const getCachedCollectionEntries = <K extends ContentCollection>(
	collection: K,
	includeDrafts: boolean,
): ContentEntry<K>[] => {
	const shouldUseCache = process.env.NODE_ENV === "production";
	const key = getCollectionCacheKey(collection, includeDrafts);
	const cached = shouldUseCache ? collectionCache.get(key) : undefined;
	if (cached) {
		return cached as ContentEntry<K>[];
	}

	const files = loadCollectionFilePaths(collection);
	const entries: ContentEntry<K>[] = [];

	for (const file of files) {
		try {
			entries.push(parseContentFile(collection, file));
		} catch (error) {
			// Keep the app resilient in production even if one file is malformed.
			if (process.env.NODE_ENV !== "production") {
				throw error;
			}
			console.warn(String(error));
		}
	}

	const filtered = includeDrafts ? entries : entries.filter((entry) => !entry.draft);
	const sorted = sortByDateDesc(filtered);
	if (shouldUseCache) {
		collectionCache.set(key, sorted as AnyContentEntry[]);
	}

	return sorted;
};

export const getCollectionContent = <K extends ContentCollection>(
	collection: K,
	options: ContentLoadOptions = {},
): ContentEntry<K>[] => {
	const includeDrafts = options.includeDrafts ?? process.env.NODE_ENV !== "production";
	const sorted = getCachedCollectionEntries(collection, includeDrafts);

	if (typeof options.limit === "number") {
		return sorted.slice(0, options.limit);
	}

	return sorted;
};

export type AnyContentEntry = ContentEntry<ContentCollection>;

export const getContent = (options: ContentLoadOptions = {}): AnyContentEntry[] => {
	const collections: ContentCollection[] = [
		"articles",
		"notes",
		"projects",
		"resources",
		"series",
	];

	const allEntries = collections.flatMap((collection) =>
		getCollectionContent(collection, options),
	);

	return sortByDateDesc(allEntries);
};

export const extractMetadata = (entry: AnyContentEntry) => ({
	title: entry.title,
	description: entry.description,
	slug: entry.slug,
	url: entry.url,
	publishedDate: entry.publishedDate,
	updatedDate: entry.updatedDate,
	tags: entry.tags,
	topics: entry.topics,
	category: entry.category,
	series: entry.series,
	technologies: entry.technologies,
	readingTimeMinutes: entry.readingTimeMinutes,
});

export const groupByTerm = <
	T extends {
		tags?: readonly string[];
		topics?: readonly string[];
		category?: string;
		series?: string;
	},
>(
	items: readonly T[],
	getter: (item: T) => readonly string[] | string | undefined,
): Array<{ value: string; items: T[] }> => {
	const groups = new Map<string, T[]>();

	for (const item of items) {
		const values = getter(item);
		if (!values) {
			continue;
		}

		for (const rawValue of Array.isArray(values) ? values : [values]) {
			const value = rawValue.trim();
			if (!value) {
				continue;
			}

			const collection = groups.get(value) ?? [];
			collection.push(item);
			groups.set(value, collection);
		}
	}

	return [...groups.entries()]
		.map(([value, groupedItems]) => ({ value, items: groupedItems }))
		.sort((a, b) => b.items.length - a.items.length || a.value.localeCompare(b.value));
};
