import { Feed, type Item } from "feed";

import { authorConfig, rssConfig, siteMetadata } from "@/config";
import { getArticles } from "@/lib/content";

const primaryAuthor = authorConfig.authors[authorConfig.primaryAuthorId];

function createFeed() {
	const feed = new Feed({
		title: rssConfig.title,
		description: rssConfig.description,
		id: siteMetadata.domain,
		link: siteMetadata.domain,
		language: rssConfig.language,
		copyright: siteMetadata.copyright,
		generator: "Martian Chronicles",
		feedLinks: {
			rss2: `${siteMetadata.domain}/rss.xml`,
			atom: `${siteMetadata.domain}/atom.xml`,
			json: `${siteMetadata.domain}/feed.json`,
		},
		author: {
			name: primaryAuthor.name,
			email: primaryAuthor.email,
			link: siteMetadata.domain,
		},
	});

	const articles = getArticles({ includeDrafts: false });
	for (const article of articles) {
		const publishedAt = article.publishedDate ? new Date(article.publishedDate) : new Date();
		const updatedAt = article.updatedDate ? new Date(article.updatedDate) : publishedAt;
		const item: Item = {
			title: article.title,
			id: `${siteMetadata.domain}${article.url}`,
			link: `${siteMetadata.domain}${article.url}`,
			description: article.description,
			content: article.excerpt,
			author: [{ name: primaryAuthor.name, email: primaryAuthor.email }],
			date: publishedAt,
			published: publishedAt,
			category: article.tags.map((name) => ({ name })),
			image: article.ogImage ? `${siteMetadata.domain}${article.ogImage}` : undefined,
		};

		feed.addItem(item);
		feed.options.updated = updatedAt;
	}

	return feed;
}

export function generateRssXml(): string {
	return createFeed().rss2();
}

export function generateAtomXml(): string {
	return createFeed().atom1();
}

export function generateJsonFeed(): string {
	return createFeed().json1();
}
