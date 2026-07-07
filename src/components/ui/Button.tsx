"use client";

import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { forwardRef } from "react";

export interface ButtonProps extends MuiButtonProps {}

/**
 * Branded button with safe defaults for consistent call-to-action styling.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	props,
	ref,
) {
	return <MuiButton ref={ref} variant="contained" color="primary" {...props} />;
});
