"use client";

import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import { forwardRef } from "react";

import { Stack } from "../ui";
import { Link, type LinkProps } from "./Link";

export interface ExternalLinkProps extends Omit<LinkProps, "href"> {
	readonly href: `http${string}`;
	readonly showIcon?: boolean;
}

/**
 * External link with safe target attributes and optional outbound icon.
 */
export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
	function ExternalLink({ showIcon = true, children, ...props }, ref) {
		return (
			<Link ref={ref} {...props}>
				<Stack direction="row" spacing={0.75} alignItems="center" component="span">
					<span>{children}</span>
					{showIcon ? <OpenInNewRounded fontSize="inherit" aria-hidden="true" /> : null}
				</Stack>
			</Link>
		);
	},
);
