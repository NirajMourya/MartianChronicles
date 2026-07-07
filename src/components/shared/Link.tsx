"use client";

import MuiLink, { type LinkProps as MuiLinkProps } from "@mui/material/Link";
import NextLink from "next/link";
import { forwardRef } from "react";

export interface LinkProps extends Omit<MuiLinkProps, "href"> {
	readonly href: string;
}

/**
 * Unified link component for internal and external navigation.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
	{ href, children, ...props },
	ref,
) {
	const isInternal = href.startsWith("/") || href.startsWith("#");

	if (isInternal) {
		return (
			<MuiLink
				ref={ref}
				component={NextLink}
				href={href}
				underline="hover"
				color="inherit"
				{...props}
			>
				{children}
			</MuiLink>
		);
	}

	return (
		<MuiLink
			ref={ref}
			href={href}
			underline="hover"
			color="inherit"
			rel="noopener noreferrer"
			target="_blank"
			{...props}
		>
			{children}
		</MuiLink>
	);
});
