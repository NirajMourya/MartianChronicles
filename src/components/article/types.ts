export interface ArticleCardData {
	readonly title: string;
	readonly href: string;
	readonly excerpt?: string;
	readonly publishedAt?: string;
	readonly readingMinutes?: number;
	readonly tags?: readonly string[];
	readonly topic?: string;
	readonly featured?: boolean;
}
