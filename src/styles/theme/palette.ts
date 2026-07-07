import type { PaletteOptions } from "@mui/material/styles";

import type { SemanticTokens, ThemeMode } from "./tokens";
import { tokensByMode } from "./tokens";

export interface SemanticPalette {
	readonly background: SemanticTokens["background"];
	readonly text: SemanticTokens["text"];
	readonly border: SemanticTokens["border"];
	readonly brand: SemanticTokens["brand"];
	readonly status: SemanticTokens["status"];
	readonly code: SemanticTokens["code"];
	readonly link: SemanticTokens["link"];
	readonly selection: SemanticTokens["selection"];
	readonly scrollbar: SemanticTokens["scrollbar"];
	readonly focusRing: SemanticTokens["focusRing"];
}

declare module "@mui/material/styles" {
	interface Palette {
		mc: SemanticPalette;
	}

	interface PaletteOptions {
		mc: SemanticPalette;
	}
}

export const getSemanticPalette = (mode: ThemeMode): SemanticPalette => {
	const semantic = tokensByMode[mode].semantic;

	return {
		background: semantic.background,
		text: semantic.text,
		border: semantic.border,
		brand: semantic.brand,
		status: semantic.status,
		code: semantic.code,
		link: semantic.link,
		selection: semantic.selection,
		scrollbar: semantic.scrollbar,
		focusRing: semantic.focusRing,
	};
};

export const createPalette = (mode: ThemeMode): PaletteOptions => {
	const semantic = getSemanticPalette(mode);

	return {
		mode,
		primary: {
			main: semantic.brand.main,
			light: semantic.brand.hover,
			dark: semantic.brand.active,
			contrastText: semantic.text.inverse,
		},
		background: {
			default: semantic.background.page,
			paper: semantic.background.surface,
		},
		text: {
			primary: semantic.text.primary,
			secondary: semantic.text.secondary,
		},
		divider: semantic.border.default,
		success: {
			main: semantic.status.success,
		},
		warning: {
			main: semantic.status.warning,
		},
		error: {
			main: semantic.status.error,
		},
		info: {
			main: semantic.status.info,
		},
		action: {
			hover: mode === "dark" ? "rgba(255, 255, 255, 0.04)" : "rgba(12, 18, 31, 0.04)",
			selected:
				mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(12, 18, 31, 0.08)",
			focus:
				mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(12, 18, 31, 0.12)",
		},
		mc: semantic,
	};
};
