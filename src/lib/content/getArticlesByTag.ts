import "server-only";

import { filterByTag, getArticles, type Article } from "./getArticles";

export const getArticlesByTag = (tag: string): Article[] => {
	return filterByTag(getArticles({ includeDrafts: false }), tag);
};
