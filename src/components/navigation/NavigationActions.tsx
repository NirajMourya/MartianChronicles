"use client";

import Box from "@mui/material/Box";

import type { NavigationItem as NavigationItemConfig } from "@/config/navigation";

import { SearchShortcut } from "@/components/search";
import { Button } from "@/components/ui";
import { ThemeToggle } from "@/components/shared";

export interface NavigationActionsProps {
	readonly cta: NavigationItemConfig;
}

/**
 * Desktop action cluster for shell controls.
 */
export function NavigationActions({ cta }: NavigationActionsProps) {
	return (
		<Box
			sx={{
				display: { xs: "none", md: "flex" },
				alignItems: "center",
				gap: 1,
			}}
		>
			<SearchShortcut enableHotkey={false} />
			<ThemeToggle />
			<Button
				component="a"
				href={cta.href}
				target={cta.external ? "_blank" : undefined}
				rel={cta.external ? "noopener noreferrer" : undefined}
				size="small"
			>
				{cta.label}
			</Button>
		</Box>
	);
}
