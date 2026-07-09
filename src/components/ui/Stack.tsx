"use client";

import MuiStack, { type StackProps as MuiStackProps } from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";
import { forwardRef } from "react";

export interface StackProps extends MuiStackProps {
	readonly alignItems?: CSSProperties["alignItems"];
	readonly justifyContent?: CSSProperties["justifyContent"];
	readonly flexWrap?: CSSProperties["flexWrap"];
	readonly textAlign?: CSSProperties["textAlign"];
}

/**
 * Directional layout primitive with default spacing.
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
	{ alignItems, justifyContent, flexWrap, textAlign, sx, ...props },
	ref,
) {
	const resolvedSx: SxProps<Theme> = [
		alignItems ? { alignItems } : null,
		justifyContent ? { justifyContent } : null,
		flexWrap ? { flexWrap } : null,
		textAlign ? { textAlign } : null,
		...(Array.isArray(sx) ? sx : sx ? [sx] : []),
	];

	return (
		<MuiStack
			ref={ref}
			spacing={2}
			sx={resolvedSx}
			{...props}
		/>
	);
});
