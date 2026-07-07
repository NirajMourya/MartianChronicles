"use client";

import SearchRounded from "@mui/icons-material/SearchRounded";
import Box from "@mui/material/Box";

import type { NavigationItem as NavigationItemConfig } from "@/config/navigation";

import { Button, IconButton, Tooltip } from "@/components/ui";
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
			<Tooltip title="Search (coming soon)">
				<IconButton aria-label="Search" onClick={() => {}}>
					<SearchRounded fontSize="small" />
				</IconButton>
			</Tooltip>
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
