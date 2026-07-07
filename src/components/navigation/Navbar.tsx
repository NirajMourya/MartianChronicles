"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigationConfig } from "@/config/navigation";

import { Logo } from "@/components/shared";
import { Container } from "@/components/ui";

import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { NavigationActions } from "./NavigationActions";

/**
 * Persistent top navigation shell with scroll-aware visual treatment.
 */
export function Navbar() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 8);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<AppBar
			position="sticky"
			color="transparent"
			elevation={0}
			sx={(theme) => ({
				borderBottom: scrolled ? `1px solid ${theme.palette.mc.border.default}` : "1px solid transparent",
				backdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
				WebkitBackdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
				backgroundColor: scrolled
					? theme.palette.mode === "dark"
						? "rgba(7, 9, 14, 0.76)"
						: "rgba(245, 247, 250, 0.82)"
					: "transparent",
				transition:
					"backdrop-filter 220ms cubic-bezier(0.2,0,0,1), background-color 220ms cubic-bezier(0.2,0,0,1), border-color 220ms cubic-bezier(0.2,0,0,1)",
				"@media (prefers-reduced-motion: reduce)": {
					transition: "none",
				},
			})}
		>
			<Container>
				<Toolbar disableGutters sx={{ minHeight: 72, gap: 2, justifyContent: "space-between" }}>
					<Box sx={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
						<Logo variant="horizontal" size="sm" />
					</Box>
					<DesktopNavigation items={navigationConfig.primary} pathname={pathname} />
					<NavigationActions cta={navigationConfig.cta} />
					<MobileNavigation
						items={navigationConfig.primary}
						pathname={pathname}
						cta={navigationConfig.cta}
					/>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
