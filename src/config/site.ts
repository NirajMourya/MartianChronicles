/**
 * Canonical site and platform configuration.
 *
 * Keep branding, SEO defaults, organization metadata, and operational defaults
 * centralized in this module so the rest of the application can consume a
 * single source of truth.
 */

import { themeConfig } from "./theme";

export type AbsoluteUrl = `https://${string}`;

export interface SiteMetadata {
	readonly name: string;
	readonly domain: AbsoluteUrl;
	readonly tagline: string;
	readonly description: string;
	readonly locale: string;
	readonly language: string;
	readonly copyright: string;
}

export interface OrganizationMetadata {
	readonly legalName: string;
	readonly displayName: string;
	readonly url: AbsoluteUrl;
	readonly logoPath: string;
}

export interface RobotsDefaults {
	readonly index: boolean;
	readonly follow: boolean;
	readonly noarchive: boolean;
	readonly nocache: boolean;
	readonly googleBot: {
		readonly index: boolean;
		readonly follow: boolean;
		readonly "max-image-preview": "none" | "standard" | "large";
		readonly "max-video-preview": number;
		readonly "max-snippet": number;
	};
}

export interface OpenGraphDefaults {
	readonly type: "website";
	readonly siteName: string;
	readonly locale: string;
	readonly defaultImage: {
		readonly url: AbsoluteUrl;
		readonly width: number;
		readonly height: number;
		readonly alt: string;
	};
}

export interface TwitterDefaults {
	readonly card: "summary" | "summary_large_image";
	readonly site: `@${string}` | "";
	readonly creator: `@${string}` | "";
}

export interface SeoDefaults {
	readonly titleTemplate: string;
	readonly defaultTitle: string;
	readonly defaultDescription: string;
	readonly canonicalBase: AbsoluteUrl;
	readonly keywords: readonly string[];
	readonly robots: RobotsDefaults;
	readonly openGraph: OpenGraphDefaults;
	readonly twitter: TwitterDefaults;
}

export interface SitemapConfig {
	readonly enabled: boolean;
	readonly changeFrequency:
		| "always"
		| "hourly"
		| "daily"
		| "weekly"
		| "monthly"
		| "yearly"
		| "never";
	readonly defaultPriority: number;
	readonly includeDrafts: boolean;
}

export interface RssConfig {
	readonly enabled: boolean;
	readonly title: string;
	readonly description: string;
	readonly path: string;
	readonly language: string;
	readonly categories: readonly string[];
}

export interface IconConfig {
	readonly icon: string;
	readonly shortcut: string;
	readonly apple: string;
}

export interface ViewportConfig {
	readonly colorScheme: "dark light" | "light dark";
	readonly themeColor: {
		readonly light: string;
		readonly dark: string;
	};
}

export interface PaginationConfig {
	readonly defaultPageSize: number;
	readonly maxPageSize: number;
	readonly archivePageSize: number;
}

export interface DefaultArticleSettings {
	readonly isFeaturedByDefault: boolean;
	readonly isDraftByDefault: boolean;
	readonly showReadingProgress: boolean;
	readonly enableTableOfContents: boolean;
	readonly enableRelatedArticles: boolean;
	readonly allowPdfDownloads: boolean;
}

export interface FeatureFlags {
	readonly search: boolean;
	readonly newsletter: boolean;
	readonly comments: boolean;
	readonly analytics: boolean;
	readonly readingProgress: boolean;
	readonly themeSwitcher: boolean;
	readonly rssFeed: boolean;
	readonly tableOfContents: boolean;
	readonly relatedArticles: boolean;
	readonly pdfDownloads: boolean;
}

export interface FooterConfig {
	readonly description: string;
	readonly builtWith: readonly string[];
}

export const siteMetadata: SiteMetadata = Object.freeze({
	name: "Martian Chronicles",
	domain: "https://martianchronicles.nirajmourya.in",
	tagline: "Exploring Software, AI and Ideas Beyond Code",
	description:
		"A premium personal knowledge platform for technical writing, learning notes, personal essays, project showcases, and curated resources.",
	locale: "en_US",
	language: "en",
	copyright: "© 2026 Niraj Mourya. All rights reserved.",
});

export const organizationMetadata: OrganizationMetadata = Object.freeze({
	legalName: "Martian Chronicles",
	displayName: "Martian Chronicles",
	url: siteMetadata.domain,
	logoPath: "/brand/logo.svg",
});

export const iconConfig: IconConfig = Object.freeze({
	icon: "/brand/favicon.svg",
	shortcut: "/brand/favicon.svg",
	apple: "/brand/app-icon.svg",
});

export const viewportConfig: ViewportConfig = Object.freeze({
	colorScheme: "dark light",
	themeColor: Object.freeze({
		light: themeConfig.palette.light.background,
		dark: themeConfig.palette.dark.background,
	}),
});

export const featureFlags: FeatureFlags = Object.freeze({
	search: true,
	newsletter: false,
	comments: false,
	analytics: false,
	readingProgress: true,
	themeSwitcher: true,
	rssFeed: true,
	tableOfContents: true,
	relatedArticles: true,
	pdfDownloads: true,
});

export const seoDefaults: SeoDefaults = Object.freeze({
	titleTemplate: "%s | Martian Chronicles",
	defaultTitle: siteMetadata.name,
	defaultDescription: siteMetadata.description,
	canonicalBase: siteMetadata.domain,
	keywords: Object.freeze([
		"software engineering",
		"technical writing",
		"learning notes",
		"project showcase",
		"developer resources",
		"ai",
	]),
	robots: Object.freeze({
		index: true,
		follow: true,
		noarchive: false,
		nocache: false,
		googleBot: Object.freeze({
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-video-preview": -1,
			"max-snippet": -1,
		}),
	}),
	openGraph: Object.freeze({
		type: "website",
		siteName: siteMetadata.name,
		locale: siteMetadata.locale,
		defaultImage: Object.freeze({
			url: `${siteMetadata.domain}/images/og-default.jpg`,
			width: 1200,
			height: 630,
			alt: "Martian Chronicles",
		}),
	}),
	twitter: Object.freeze({
		card: "summary_large_image",
		site: "",
		creator: "",
	}),
});

export const sitemapConfig: SitemapConfig = Object.freeze({
	enabled: true,
	changeFrequency: "weekly",
	defaultPriority: 0.7,
	includeDrafts: false,
});

export const rssConfig: RssConfig = Object.freeze({
	enabled: true,
	title: siteMetadata.name,
	description: siteMetadata.description,
	path: "/rss.xml",
	language: siteMetadata.language,
	categories: Object.freeze([
		"Technical Articles",
		"Learning Notes",
		"Projects",
		"Resources",
		"Personal Articles",
	]),
});

export const paginationConfig: PaginationConfig = Object.freeze({
	defaultPageSize: 12,
	maxPageSize: 50,
	archivePageSize: 24,
});

export const defaultArticleSettings: DefaultArticleSettings = Object.freeze({
	isFeaturedByDefault: false,
	isDraftByDefault: true,
	showReadingProgress: true,
	enableTableOfContents: true,
	enableRelatedArticles: true,
	allowPdfDownloads: true,
});

export const footerConfig: FooterConfig = Object.freeze({
	description: siteMetadata.tagline,
	builtWith: Object.freeze(["Next.js", "React", "Material UI"]),
});
