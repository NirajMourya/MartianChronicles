"use client";

import Typography, { type TypographyProps } from "@mui/material/Typography";
import { forwardRef } from "react";

export interface HeadingProps extends Omit<TypographyProps, "variant"> {
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
	{ level = 2, component, ...props },
	ref,
) {
	const variant = variantByLevel[level];
	const Component = component ?? variant;
	return <Typography ref={ref} variant={variant} component={Component} {...props} />;
});
