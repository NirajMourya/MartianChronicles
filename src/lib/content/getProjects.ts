import "server-only";

import { getCollectionContent, type ContentEntry, type ContentLoadOptions } from "./getContent";

export type Project = ContentEntry<"projects">;

export const getProjects = (options: ContentLoadOptions = {}): Project[] =>
	getCollectionContent("projects", options);
