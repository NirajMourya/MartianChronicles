"use client";

import MuiStack, { type StackProps as MuiStackProps } from "@mui/material/Stack";
import { forwardRef } from "react";

export interface StackProps extends MuiStackProps {}

/**
 * Directional layout primitive with default spacing.
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
	props,
	ref,
) {
	return <MuiStack ref={ref} spacing={2} {...props} />;
});
