"use client";

import MuiChip, { type ChipProps as MuiChipProps } from "@mui/material/Chip";
import { forwardRef } from "react";

export interface ChipProps extends MuiChipProps {}

/**
 * Small semantic label token for metadata and filters.
 */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(props, ref) {
	return <MuiChip ref={ref} size="small" variant="outlined" {...props} />;
});
