import "server-only";

import { getCollectionContent, type ContentEntry, type ContentLoadOptions } from "./getContent";

export type Resource = ContentEntry<"resources">;

export const getResources = (options: ContentLoadOptions = {}): Resource[] =>
	getCollectionContent("resources", options);
