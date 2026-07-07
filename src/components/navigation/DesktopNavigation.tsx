"use client";

import Box from "@mui/material/Box";

import type { NavigationItem as NavigationItemConfig } from "@/config/navigation";

import { NavigationItem } from "./NavigationItem";

export interface DesktopNavigationProps {
	readonly items: readonly NavigationItemConfig[];
	readonly pathname: string;
}

/**
 * Desktop primary navigation list.
 */
export function DesktopNavigation({ items, pathname }: DesktopNavigationProps) {
	return (
		<Box
			component="nav"
			aria-label="Primary"
			sx={{ display: { xs: "none", md: "block" } }}
		>
			<Box component="ul" sx={{ display: "flex", gap: 3, m: 0, p: 0, listStyle: "none" }}>
				{items.map((item) => {
					const active =
						item.href === "/"
							? pathname === "/"
							: pathname === item.href || pathname.startsWith(`${item.href}/`);
					return (
						<Box component="li" key={item.href}>
							<NavigationItem item={item} active={active} />
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}
