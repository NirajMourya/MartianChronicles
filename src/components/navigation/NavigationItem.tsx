"use client";

import MuiLink from "@mui/material/Link";
import NextLink from "next/link";

import type { NavigationItem as NavigationItemConfig } from "@/config/navigation";

export interface NavigationItemProps {
	readonly item: NavigationItemConfig;
	readonly active?: boolean;
	readonly onClick?: () => void;
}

/**
 * Shared navigation link with active-state indicator and reduced-motion support.
 */
export function NavigationItem({ item, active = false, onClick }: NavigationItemProps) {
	const isInternal = !item.external && item.href.startsWith("/");
	const commonSx = {
		position: "relative",
		display: "inline-flex",
		alignItems: "center",
		px: 0.5,
		py: 0.25,
		fontWeight: active ? 600 : 500,
		color: active ? "text.primary" : "text.secondary",
		textDecoration: "none",
		outlineOffset: 3,
		transition: "color 180ms cubic-bezier(0.2, 0, 0, 1)",
		"&::after": {
			content: '""',
			position: "absolute",
			left: 0,
			right: 0,
			bottom: -4,
			height: 2,
			borderRadius: 2,
			backgroundColor: "primary.main",
			transform: active ? "scaleX(1)" : "scaleX(0)",
			transformOrigin: "left",
			transition: "transform 200ms cubic-bezier(0.2, 0, 0, 1)",
		},
		"&:hover::after, &:focus-visible::after": {
			transform: "scaleX(1)",
		},
		"@media (prefers-reduced-motion: reduce)": {
			transition: "none",
			"&::after": {
				transition: "none",
			},
		},
	} as const;

	if (isInternal) {
		return (
			<MuiLink
				component={NextLink}
				href={item.href}
				sx={commonSx}
				onClick={onClick}
				aria-current={active ? "page" : undefined}
			>
				{item.label}
			</MuiLink>
		);
	}

	return (
		<MuiLink
			href={item.href}
			target={item.external ? "_blank" : undefined}
			rel={item.external ? "noopener noreferrer" : undefined}
			sx={commonSx}
			onClick={onClick}
		>
			{item.label}
		</MuiLink>
	);
}
