import "server-only";

import { filterBySeries, getArticles, type Article } from "./getArticles";

export const getArticlesBySeries = (series: string): Article[] => {
	return filterBySeries(getArticles({ includeDrafts: false }), series);
};
