import "server-only";

import { filterByCategory, getArticles, type Article } from "./getArticles";

export const getArticlesByCategory = (category: string): Article[] => {
	return filterByCategory(getArticles({ includeDrafts: false }), category);
};
