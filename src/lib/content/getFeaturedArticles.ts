import "server-only";

import { getArticles, type Article } from "./getArticles";

export const getFeaturedArticles = (limit = 6): Article[] => {
	return getArticles({ includeDrafts: false }).filter((article) => article.featured).slice(0, limit);
};
