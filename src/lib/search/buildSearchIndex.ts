import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";

import fastGlob from "fast-glob";
import matter from "gray-matter";

import {
	normalizeDocumentText,
	uniqueTerms,
	type SearchContentType,
	type SearchDocument,
	type SearchIndexPayload,
} from "./searchUtils";

type ContentCollection = "articles" | "notes" | "projects" | "resources" | "series";

const generatedDirectory = path.join(process.cwd(), "src", "generated");
const outputPath = path.join(generatedDirectory, "search-index.json");
const contentDirectory = path.join(process.cwd(), "content");

const collectionToUrlPrefix: Readonly<Record<ContentCollection, string>> = Object.freeze({
	articles: "/articles",
	notes: "/notes",
	projects: "/projects",
	resources: "/resources",
	series: "/series",
});

const collectionToContentType: Readonly<Record<ContentCollection, SearchContentType>> = Object.freeze({
	articles: "article",
	notes: "note",
	projects: "project",
	resources: "resource",
	series: "series",
});

const inferContentType = (value?: string): SearchContentType => {
	if (value === "note" || value === "project" || value === "resource" || value === "series") {
		return value;
	}
	return "article";
};

const slugFromPath = (relativePath: string): string => {
	return relativePath.replace(/\\/g, "/").replace(/\.mdx?$/i, "");
};

const headingPattern = /^(#{2,6})\s+(.+?)\s*$/gm;

const extractHeadings = (source: string): string[] => {
	const matches: string[] = [];
	for (const match of source.matchAll(headingPattern)) {
		matches.push(match[2].replace(/[\*_~`]/g, "").trim());
	}
	return matches;
};

const toArray = (value: unknown): string[] => {
	if (!Array.isArray(value)) {
		return [];
	}
	return value.filter((entry): entry is string => typeof entry === "string");
};

const buildDocument = (
	collection: ContentCollection,
	relativePath: string,
	frontmatter: Record<string, unknown>,
	body: string,
): SearchDocument => {
	const slug = typeof frontmatter.slug === "string" ? frontmatter.slug : slugFromPath(relativePath);
	const title = typeof frontmatter.title === "string" ? frontmatter.title : slug;
	const description = typeof frontmatter.description === "string" ? frontmatter.description : "";
	const category = typeof frontmatter.category === "string" ? frontmatter.category : "";
	const seriesValue = typeof frontmatter.series === "string" ? frontmatter.series : "";
	const contentType =
		typeof frontmatter.contentType === "string"
			? inferContentType(frontmatter.contentType)
			: collectionToContentType[collection];

	const headings = extractHeadings(body);

	const tags = uniqueTerms(toArray(frontmatter.tags));
	const topics = uniqueTerms(toArray(frontmatter.topics));
	const technologies = uniqueTerms(toArray(frontmatter.technologies));
	const categories = category ? uniqueTerms([category]) : [];
	const series = seriesValue ? uniqueTerms([seriesValue]) : [];

	return {
		id: `${collection}:${slug}`,
		slug,
		url: `${collectionToUrlPrefix[collection]}/${slug}`,
		title,
		description,
		headings,
		tags,
		topics,
		categories,
		technologies,
		series,
		body: normalizeDocumentText(body),
		contentType,
		publishedDate: typeof frontmatter.publishedDate === "string" ? frontmatter.publishedDate : undefined,
	};
};

const collections: readonly ContentCollection[] = ["articles", "notes", "projects", "resources", "series"];

export function buildSearchIndex(): SearchIndexPayload {
	const documents: SearchDocument[] = [];

	for (const collection of collections) {
		const collectionPath = path.join(contentDirectory, collection);
		const files = fastGlob.sync("**/*.mdx", {
			cwd: collectionPath,
			onlyFiles: true,
			absolute: false,
		});

		for (const relativePath of files) {
			const absolutePath = path.join(collectionPath, relativePath);
			const fileContent = fsSync.readFileSync(absolutePath, "utf8");
			const parsed = matter(fileContent);
			const frontmatter = parsed.data as Record<string, unknown>;

			if (frontmatter.draft === true) {
				continue;
			}

			documents.push(buildDocument(collection, relativePath, frontmatter, parsed.content));
		}
	}

	return {
		generatedAt: new Date().toISOString(),
		documents,
	};
}

export async function writeSearchIndexFile(): Promise<void> {
	const payload = buildSearchIndex();
	await fs.mkdir(generatedDirectory, { recursive: true });
	await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), "utf8");
}

if (process.argv[1] && path.resolve(process.argv[1]).endsWith(path.normalize("src/lib/search/buildSearchIndex.ts"))) {
	writeSearchIndexFile()
		.then(() => {
			// eslint-disable-next-line no-console
			console.log(`Generated search index at ${outputPath}`);
		})
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.error("Failed to generate search index", error);
			process.exitCode = 1;
		});
}
