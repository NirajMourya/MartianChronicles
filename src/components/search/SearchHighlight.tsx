import { Fragment } from "react";

import { tokenizeQuery } from "@/lib/search/searchUtils";

export interface SearchHighlightProps {
	readonly text: string;
	readonly query: string;
}

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function SearchHighlight({ text, query }: SearchHighlightProps) {
	const terms = tokenizeQuery(query)
		.map((term) => term.trim())
		.filter((term) => term.length >= 2);

	if (!terms.length) {
		return <>{text}</>;
	}

	const regex = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
	const segments = text.split(regex);

	return (
		<>
			{segments.map((segment, index) => {
				const isMatch = terms.some((term) => term.toLowerCase() === segment.toLowerCase());
				if (!isMatch) {
					return <Fragment key={`${segment}-${index}`}>{segment}</Fragment>;
				}
				return (
					<mark
						key={`${segment}-${index}`}
						style={{
							backgroundColor: "rgba(255, 122, 36, 0.22)",
							color: "inherit",
							padding: 0,
							borderRadius: 2,
						}}
					>
						{segment}
					</mark>
				);
			})}
		</>
	);
}
