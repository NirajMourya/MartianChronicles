import { authorConfig, organizationMetadata, siteMetadata } from "@/config";

const primaryAuthor = authorConfig.authors[authorConfig.primaryAuthorId];

export interface BreadcrumbItem {
	readonly name: string;
	readonly path: string;
}

export interface ArticleJsonLdInput {
	readonly title: string;
	readonly description: string;
	readonly path: string;
	readonly publishedTime?: string;
	readonly modifiedTime?: string;
	readonly image?: string;
	readonly tags?: readonly string[];
}

export function buildOrganizationJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: organizationMetadata.displayName,
		url: organizationMetadata.url,
		logo: `${siteMetadata.domain}${organizationMetadata.logoPath}`,
	};
}

export function buildPersonJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: primaryAuthor.name,
		url: siteMetadata.domain,
		email: `mailto:${primaryAuthor.email}`,
		jobTitle: primaryAuthor.role,
	};
}

export function buildWebsiteJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteMetadata.name,
		url: siteMetadata.domain,
		description: siteMetadata.description,
		potentialAction: {
			"@type": "SearchAction",
			target: `${siteMetadata.domain}/search?q={search_term_string}`,
			"query-input": "required name=search_term_string",
		},
	};
}

export function buildWebPageJsonLd(title: string, description: string, path: string) {
	return {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: title,
		description,
		url: `${siteMetadata.domain}${path}`,
		inLanguage: siteMetadata.language,
	};
}

export function buildBreadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${siteMetadata.domain}${item.path}`,
		})),
	};
}

export function buildArticleJsonLd(input: ArticleJsonLdInput) {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: input.title,
		description: input.description,
		url: `${siteMetadata.domain}${input.path}`,
		datePublished: input.publishedTime,
		dateModified: input.modifiedTime,
		keywords: input.tags?.join(", "),
		image: input.image ? [`${siteMetadata.domain}${input.image}`] : undefined,
		author: {
			"@type": "Person",
			name: primaryAuthor.name,
		},
		publisher: {
			"@type": "Organization",
			name: organizationMetadata.displayName,
			logo: {
				"@type": "ImageObject",
				url: `${siteMetadata.domain}${organizationMetadata.logoPath}`,
			},
		},
	};
}
