import "server-only";

import GithubSlugger from "github-slugger";

export interface HeadingOutlineItem {
	readonly id: string;
	readonly depth: 2 | 3 | 4 | 5 | 6;
	readonly text: string;
}

const slugger = new GithubSlugger();

const stripInlineMarkdown = (value: string): string => {
	return value
		.replace(/`([^`]*)`/g, "$1")
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
		.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
		.replace(/<[^>]+>/g, "")
		.replace(/[\*_~]/g, "")
		.replace(/\s+/g, " ")
		.trim();
};

/**
 * Extract a stable heading outline from MDX source.
 */
export function extractHeadingsFromMarkdown(source: string): HeadingOutlineItem[] {
	slugger.reset();
	const items: HeadingOutlineItem[] = [];
	const lines = source.split(/\r?\n/);
	let inFence = false;

	for (const line of lines) {
		const fenceMatch = line.match(/^\s*(```|~~~)/);
		if (fenceMatch) {
			inFence = !inFence;
			continue;
		}

		if (inFence) {
			continue;
		}

		const headingMatch = line.match(/^(#{2,6})\s+(.+?)\s*$/);
		if (!headingMatch) {
			continue;
		}

		const depth = headingMatch[1].length as HeadingOutlineItem["depth"];
		const text = stripInlineMarkdown(headingMatch[2]);
		if (!text) {
			continue;
		}

		items.push({
			id: slugger.slug(text),
			depth,
			text,
		});
	}

	return items;
}