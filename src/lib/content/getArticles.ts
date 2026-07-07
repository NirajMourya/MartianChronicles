import "server-only";

import { getCollectionContent, type ContentEntry, type ContentLoadOptions } from "./getContent";

export type Article = ContentEntry<"articles">;

export const getArticles = (options: ContentLoadOptions = {}): Article[] =>
	getCollectionContent("articles", options);
