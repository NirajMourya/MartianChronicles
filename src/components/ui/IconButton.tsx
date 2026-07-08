"use client";

import MuiIconButton, {
	type IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";
import type { ElementType } from "react";
import { forwardRef } from "react";

export interface IconButtonProps extends MuiIconButtonProps {
	readonly component?: ElementType;
	readonly href?: string;
	readonly target?: string;
	readonly rel?: string;
}

/**
 * Icon-only button with accessible defaults.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton(props, ref) {
		return <MuiIconButton ref={ref} color="inherit" size="medium" {...props} />;
	},
);
