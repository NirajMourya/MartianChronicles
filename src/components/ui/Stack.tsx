"use client";

import MuiStack, { type StackProps as MuiStackProps } from "@mui/material/Stack";
import type { CSSProperties } from "react";
import { forwardRef } from "react";

export interface StackProps extends MuiStackProps {
	readonly alignItems?: CSSProperties["alignItems"];
	readonly justifyContent?: CSSProperties["justifyContent"];
	readonly flexWrap?: CSSProperties["flexWrap"];
}

/**
 * Directional layout primitive with default spacing.
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
	{ alignItems, justifyContent, flexWrap, sx, ...props },
	ref,
) {
	return (
		<MuiStack
			ref={ref}
			spacing={2}
			sx={[
				alignItems ? { alignItems } : null,
				justifyContent ? { justifyContent } : null,
				flexWrap ? { flexWrap } : null,
				sx,
			]}
			{...props}
		/>
	);
});
