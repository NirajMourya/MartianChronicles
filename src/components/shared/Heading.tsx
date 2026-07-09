"use client";

import Typography, { type TypographyProps } from "@mui/material/Typography";
import { forwardRef } from "react";

export interface HeadingProps extends TypographyProps {
	readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const variantByLevel = {
	1: "h1",
	2: "h2",
	3: "h3",
	4: "h4",
	5: "h5",
	6: "h6",
} as const;

/**
 * Semantic heading primitive with level-to-typography mapping.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
	{ level = 2, component, variant, ...props },
	ref,
) {
	const resolvedVariant = variant ?? variantByLevel[level];
	const resolvedComponent = component ?? (`h${level}` as const);
	return <Typography ref={ref} variant={resolvedVariant} component={resolvedComponent} {...props} />;
});
