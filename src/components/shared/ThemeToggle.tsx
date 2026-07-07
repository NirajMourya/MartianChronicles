"use client";

import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";

import { useThemeMode } from "@/hooks";

import { IconButton, type IconButtonProps, Tooltip } from "../ui";

export interface ThemeToggleProps extends Omit<IconButtonProps, "onClick" | "children"> {}

/**
 * Toggle between dark and light mode using the global color-mode provider.
 */
export function ThemeToggle(props: ThemeToggleProps) {
	const { isDarkMode, toggleMode } = useThemeMode();
	const label = isDarkMode ? "Switch to light mode" : "Switch to dark mode";

	return (
		<Tooltip title={label}>
			<IconButton aria-label={label} onClick={toggleMode} {...props}>
				{isDarkMode ? <LightModeRounded /> : <DarkModeRounded />}
			</IconButton>
		</Tooltip>
	);
}
