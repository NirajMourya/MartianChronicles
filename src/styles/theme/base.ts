import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { createPalette } from "./palette";
import { createShadows } from "./shadows";
import { createSpacingConfig } from "./spacing";
import { breakpoints, radiusScale, tokensByMode, type ThemeMode } from "./tokens";
import { createTypography } from "./typography";

const createGlobalCssBaseline = (mode: ThemeMode) => ({
	"*": {
		boxSizing: "border-box",
	},
	"*::selection": {
		backgroundColor: tokensByMode[mode].semantic.selection.background,
		color: tokensByMode[mode].semantic.selection.text,
	},
	"*::-webkit-scrollbar": {
		width: 10,
		height: 10,
	},
	"*::-webkit-scrollbar-thumb": {
		backgroundColor: tokensByMode[mode].semantic.scrollbar.thumb,
		borderRadius: radiusScale.pill,
	},
	"*::-webkit-scrollbar-thumb:hover": {
		backgroundColor: tokensByMode[mode].semantic.scrollbar.thumbHover,
	},
	"*::-webkit-scrollbar-track": {
		backgroundColor: tokensByMode[mode].semantic.scrollbar.track,
	},
	":focus-visible": {
		outline: `2px solid ${tokensByMode[mode].semantic.focusRing}`,
		outlineOffset: 2,
	},
	"@media (prefers-reduced-motion: reduce)": {
		"*": {
			animationDuration: "0.01ms !important",
			animationIterationCount: "1 !important",
			transitionDuration: "0.01ms !important",
			scrollBehavior: "auto !important",
		},
	},
});

export const createModeTheme = (mode: ThemeMode) => {
	let theme = createTheme({
		breakpoints: {
			values: breakpoints,
		},
		palette: createPalette(mode),
		typography: createTypography(),
		shape: {
			borderRadius: radiusScale.medium,
		},
		shadows: createShadows(mode),
		...createSpacingConfig(),
		components: {
			MuiCssBaseline: {
				styleOverrides: createGlobalCssBaseline(mode),
			},
			MuiTypography: {
				defaultProps: {
					variantMapping: {
						bodyLarge: "p",
						code: "code",
					},
				},
			},
		},
	});

	theme = responsiveFontSizes(theme, {
		factor: 2,
		breakpoints: ["sm", "md", "lg"],
		disableAlign: false,
	});

	return theme;
};
