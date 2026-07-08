import type { HTMLAttributes, ReactNode } from "react";

import { Heading as SharedHeading } from "@/components/shared";

export interface MdxHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	readonly level: 1 | 2 | 3 | 4 | 5 | 6;
	readonly children: ReactNode;
}

/**
 * Accessible heading mapping for MDX content.
 */
export function Heading({ level, children, ...props }: MdxHeadingProps) {
	return (
		<SharedHeading
			level={level}
			sx={{
				mt: level <= 2 ? 5 : 4,
				mb: 1.5,
				scrollMarginTop: { xs: 12, md: 14 },
			}}
			{...props}
		>
			{children}
		</SharedHeading>
	);
}
