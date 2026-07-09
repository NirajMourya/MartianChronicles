"use client";

import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { forwardRef } from "react";

export interface ButtonProps
	extends MuiButtonProps,
		Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "rel" | "target"> {}

/**
 * Branded button with safe defaults for consistent call-to-action styling.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ href, ...props },
	ref,
) {
	const isInternalHref = typeof href === "string" && (href.startsWith("/") || href.startsWith("#"));

	return (
		<MuiButton
			ref={ref}
			variant="contained"
			color="primary"
			href={href}
			LinkComponent={isInternalHref ? NextLink : undefined}
			{...props}
		/>
	);
});
