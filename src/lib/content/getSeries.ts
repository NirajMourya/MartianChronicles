import "server-only";

import { getCollectionContent, type ContentEntry, type ContentLoadOptions } from "./getContent";

export type Series = ContentEntry<"series">;

export const getSeries = (options: ContentLoadOptions = {}): Series[] =>
	getCollectionContent("series", options);
