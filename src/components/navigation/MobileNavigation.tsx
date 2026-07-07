"use client";

import MenuRounded from "@mui/icons-material/MenuRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import type { NavigationItem as NavigationItemConfig } from "@/config/navigation";

import { Logo, ThemeToggle } from "@/components/shared";
import { Button, IconButton, Stack, Tooltip } from "@/components/ui";

import { NavigationItem } from "./NavigationItem";

export interface MobileNavigationProps {
	readonly items: readonly NavigationItemConfig[];
	readonly pathname: string;
	readonly cta: NavigationItemConfig;
}

/**
 * Mobile shell navigation with swipeable drawer.
 */
export function MobileNavigation({ items, pathname, cta }: MobileNavigationProps) {
	const [open, setOpen] = useState(false);

	const toggleOpen = (nextOpen: boolean) => () => {
		setOpen(nextOpen);
	};

	return (
		<Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 0.5 }}>
			<Tooltip title="Search (coming soon)">
				<IconButton aria-label="Search" onClick={() => {}}>
					<SearchRounded fontSize="small" />
				</IconButton>
			</Tooltip>
			<ThemeToggle />
			<IconButton aria-label="Open menu" onClick={toggleOpen(true)}>
				<MenuRounded fontSize="small" />
			</IconButton>
			<Drawer
				anchor="right"
				open={open}
				onOpen={toggleOpen(true)}
				onClose={toggleOpen(false)}
				disableDiscovery={false}
				disableSwipeToOpen={false}
				ModalProps={{ keepMounted: true }}
			>
				<Box
					role="dialog"
					aria-label="Mobile navigation"
					sx={{
						width: 320,
						height: "100%",
						display: "flex",
						flexDirection: "column",
						p: 2,
						gap: 2,
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<Logo variant="horizontal" size="sm" />
						<Typography variant="caption" color="text.secondary">
							Menu
						</Typography>
					</Box>
					<Divider />
					<Stack component="nav" aria-label="Mobile primary" spacing={1.5}>
						{items.map((item) => {
							const active =
								item.href === "/"
									? pathname === "/"
									: pathname === item.href || pathname.startsWith(`${item.href}/`);
							return (
								<NavigationItem
									key={item.href}
									item={item}
									active={active}
									onClick={toggleOpen(false)}
								/>
							);
						})}
					</Stack>
					<Box sx={{ mt: "auto", display: "grid", gap: 1.5 }}>
						<Button
							component="a"
							href={cta.href}
							target={cta.external ? "_blank" : undefined}
							rel={cta.external ? "noopener noreferrer" : undefined}
							onClick={toggleOpen(false)}
						>
							{cta.label}
						</Button>
					</Box>
				</Box>
			</Drawer>
		</Box>
	);
}
