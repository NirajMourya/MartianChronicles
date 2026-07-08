"use client";

import MuiIconButton, {
	type IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";
import { forwardRef } from "react";

export type IconButtonProps = MuiIconButtonProps;

/**
 * Icon-only button with accessible defaults.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	function IconButton(props, ref) {
		return <MuiIconButton ref={ref} color="inherit" size="medium" {...props} />;
	},
);
