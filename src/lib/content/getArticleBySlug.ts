import "server-only";

import type { ContentLoadOptions } from "./getContent";
import { getArticles, type Article } from "./getArticles";

export const getArticleBySlug = (
	slug: string,
	options: ContentLoadOptions = {},
): Article | null => {
	const entries = getArticles(options);
	return entries.find((article) => article.slug === slug) ?? null;
};
