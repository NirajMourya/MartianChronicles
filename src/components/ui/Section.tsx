"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import { forwardRef } from "react";

export interface SectionProps extends BoxProps {
	readonly as?: BoxProps["component"];
}

/**
 * Semantic section wrapper with consistent vertical rhythm.
 */
export const Section = forwardRef<HTMLDivElement, SectionProps>(function Section(
	{ as = "section", sx, ...props },
	ref,
) {
	return <Box ref={ref} component={as} sx={{ py: { xs: 6, md: 10 }, ...sx }} {...props} />;
});
