"use client";

import MuiChip, { type ChipProps as MuiChipProps } from "@mui/material/Chip";
import type { ElementType } from "react";
import { forwardRef } from "react";

export interface ChipProps extends MuiChipProps {
	readonly component?: ElementType;
	readonly href?: string;
	readonly target?: string;
	readonly rel?: string;
}

/**
 * Small semantic label token for metadata and filters.
 */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(props, ref) {
	return <MuiChip ref={ref} size="small" variant="outlined" {...props} />;
});
