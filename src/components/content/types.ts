import type { ReactNode } from "react";

export interface ContentBreadcrumbItem {
	readonly label: string;
	readonly href?: string;
}

export interface ContentItem {
	readonly title: string;
	readonly href: string;
	readonly description?: string;
	readonly excerpt?: string;
	readonly publishedAt?: string;
	readonly updatedAt?: string;
	readonly readingMinutes?: number;
	readonly count?: number;
	readonly tagCount?: number;
	readonly topicCount?: number;
	readonly category?: string;
	readonly series?: string;
	readonly tags?: readonly string[];
	readonly topics?: readonly string[];
	readonly order?: number;
	readonly metadata?: ReactNode;
}
