import "server-only";

import { filterByMonth, getArticles, type Article } from "./getArticles";

export const getArticlesByArchive = (year: string, month: string): Article[] => {
	return filterByMonth(getArticles({ includeDrafts: false }), year, month);
};
