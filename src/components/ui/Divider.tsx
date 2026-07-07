"use client";

import MuiDivider, {
	type DividerProps as MuiDividerProps,
} from "@mui/material/Divider";
import { forwardRef } from "react";

export interface DividerProps extends MuiDividerProps {}

/**
 * Standard divider with semantic color from theme.
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(
	props,
	ref,
) {
	return <MuiDivider ref={ref} {...props} />;
});
