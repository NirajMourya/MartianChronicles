import "server-only";

import {
	filterByCategory,
	filterByMonth,
	filterBySeries,
	filterByTag,
	filterByTopic,
	getCollectionContent,
	type ContentEntry,
	type ContentLoadOptions,
} from "./getContent";

export type Article = ContentEntry<"articles">;

export const getArticles = (options: ContentLoadOptions = {}): Article[] =>
	getCollectionContent("articles", options);

export { filterByCategory, filterByMonth, filterBySeries, filterByTag, filterByTopic };
