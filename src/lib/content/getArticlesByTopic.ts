import "server-only";

import { filterByTopic, getArticles, type Article } from "./getArticles";

export const getArticlesByTopic = (topic: string): Article[] => {
	return filterByTopic(getArticles({ includeDrafts: false }), topic);
};
