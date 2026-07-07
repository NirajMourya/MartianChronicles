"use client";

import {
	CssBaseline,
	GlobalStyles,
	ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import type { ReactNode } from "react";

import { useThemeMode } from "@/hooks/useTheme";
import { darkTheme, lightTheme } from "@/styles/theme";

export function ThemeProvider({ children }: { readonly children: ReactNode }) {
	const { mode } = useThemeMode();
	const theme = mode === "dark" ? darkTheme : lightTheme;

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<GlobalStyles
				styles={{
					html: {
						height: "100%",
						scrollBehavior: "smooth",
					},
					body: {
						minHeight: "100%",
						textRendering: "optimizeLegibility",
					},
					"#main-content": {
						minHeight: "100vh",
					},
					".skip-link": {
						position: "absolute",
						top: -40,
						left: 8,
						zIndex: 1600,
						padding: "8px 12px",
						borderRadius: 999,
						backgroundColor: theme.palette.mc.background.elevated,
						color: theme.palette.mc.text.primary,
						border: `1px solid ${theme.palette.mc.border.default}`,
						textDecoration: "none",
						transition: "top 120ms cubic-bezier(0.2, 0, 0, 1)",
					},
					".skip-link:focus-visible": {
						top: 8,
					},
					"@media (prefers-reduced-motion: reduce)": {
						html: {
							scrollBehavior: "auto",
						},
					},
				}}
			/>
			{children}
		</MuiThemeProvider>
	);
}
