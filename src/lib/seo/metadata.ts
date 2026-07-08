import type { Metadata } from "next";

import { authorConfig, iconConfig, seoDefaults, siteMetadata } from "@/config";

const primaryAuthor = authorConfig.authors[authorConfig.primaryAuthorId];

export interface SeoPageInput {
	readonly title: string;
	readonly description: string;
	readonly path: string;
	readonly canonicalUrl?: string;
	readonly keywords?: readonly string[];
	readonly type?: "website" | "article";
	readonly imageUrl?: string;
	readonly imageAlt?: string;
	readonly publishedTime?: string;
	readonly modifiedTime?: string;
	readonly tags?: readonly string[];
}

export function buildCanonical(path: string): string {
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return `${siteMetadata.domain}${normalized}`;
}

export function buildPageMetadata(input: SeoPageInput): Metadata {
	const canonical = input.canonicalUrl ?? buildCanonical(input.path);
	const image = input.imageUrl ?? seoDefaults.openGraph.defaultImage.url;
	const imageAlt = input.imageAlt ?? seoDefaults.openGraph.defaultImage.alt;
	const keywords = [...new Set([...(seoDefaults.keywords ?? []), ...(input.keywords ?? [])])];

	return {
		metadataBase: new URL(siteMetadata.domain),
		title: input.title,
		description: input.description,
		keywords,
		authors: [{ name: primaryAuthor.name, url: siteMetadata.domain }],
		creator: primaryAuthor.name,
		publisher: siteMetadata.name,
		alternates: {
			canonical,
		},
		robots: {
			index: seoDefaults.robots.index,
			follow: seoDefaults.robots.follow,
			noarchive: seoDefaults.robots.noarchive,
			nocache: seoDefaults.robots.nocache,
			googleBot: {
				index: seoDefaults.robots.googleBot.index,
				follow: seoDefaults.robots.googleBot.follow,
				"max-image-preview": seoDefaults.robots.googleBot["max-image-preview"],
				"max-video-preview": seoDefaults.robots.googleBot["max-video-preview"],
				"max-snippet": seoDefaults.robots.googleBot["max-snippet"],
			},
		},
		icons: {
			icon: iconConfig.icon,
			shortcut: iconConfig.shortcut,
			apple: iconConfig.apple,
		},
		openGraph: {
			type: input.type ?? "website",
			title: input.title,
			description: input.description,
			url: canonical,
			siteName: seoDefaults.openGraph.siteName,
			locale: seoDefaults.openGraph.locale,
			images: [
				{
					url: image,
					width: seoDefaults.openGraph.defaultImage.width,
					height: seoDefaults.openGraph.defaultImage.height,
					alt: imageAlt,
				},
			],
			publishedTime: input.publishedTime,
			modifiedTime: input.modifiedTime,
			tags: input.tags ? [...input.tags] : undefined,
		},
		twitter: {
			card: "summary_large_image",
			title: input.title,
			description: input.description,
			creator: seoDefaults.twitter.creator || `@${primaryAuthor.username}`,
			site: seoDefaults.twitter.site || undefined,
			images: [image],
		},
	};
}
