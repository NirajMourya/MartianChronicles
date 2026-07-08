import "server-only";

import { getArticles, type Article } from "./getArticles";

export const getRecentArticles = (limit = 6): Article[] => {
	return getArticles({ includeDrafts: false }).slice(0, limit);
};
