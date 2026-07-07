"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import { forwardRef } from "react";

export interface GridProps extends BoxProps {
	readonly columns?: number | string;
	readonly gap?: number | string;
	readonly minItemWidth?: number | string;
}

/**
 * Lightweight CSS Grid primitive for repeatable responsive grids.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
	{ columns, gap = 2, minItemWidth = 280, sx, ...props },
	ref,
) {
	const templateColumns =
		typeof columns === "undefined"
			? `repeat(auto-fit, minmax(${typeof minItemWidth === "number" ? `${minItemWidth}px` : minItemWidth}, 1fr))`
			: typeof columns === "number"
				? `repeat(${columns}, minmax(0, 1fr))`
				: columns;

	return (
		<Box
			ref={ref}
			sx={{
				display: "grid",
				templateColumns,
				gap,
				...sx,
			}}
			{...props}
		/>
	);
});
