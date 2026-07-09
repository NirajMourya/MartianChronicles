/**
 * Theme configuration consumed by the design system and provider layer.
 * Dark mode is default while preserving full light-mode support.
 */

export type ThemeMode = "dark" | "light";

export interface ThemeFonts {
	readonly heading: string;
	readonly body: string;
	readonly mono: string;
}

export interface ThemePalette {
	readonly martianOrange: string;
	readonly dark: {
		readonly background: string;
		readonly surface: string;
		readonly text: string;
		readonly mutedText: string;
		readonly border: string;
	};
	readonly light: {
		readonly background: string;
		readonly surface: string;
		readonly text: string;
		readonly mutedText: string;
		readonly border: string;
	};
}

export interface ThemeSpacing {
	readonly unit: number;
	readonly sectionY: number;
	readonly containerMaxWidth: number;
}

export interface ThemeMotion {
	readonly reduceMotionByDefault: boolean;
	readonly pageTransitionMs: number;
	readonly staggerMs: number;
}

export interface ThemeConfig {
	readonly defaultMode: ThemeMode;
	readonly supportedModes: readonly ThemeMode[];
	readonly fonts: ThemeFonts;
	readonly palette: ThemePalette;
	readonly spacing: ThemeSpacing;
	readonly radius: {
		readonly sm: number;
		readonly md: number;
		readonly lg: number;
		readonly xl: number;
	};
	readonly motion: ThemeMotion;
}

export const themeConfig: ThemeConfig = Object.freeze({
	defaultMode: "dark",
	supportedModes: Object.freeze(["dark", "light"] as const),
	fonts: Object.freeze({
		heading: "'Space Grotesk', sans-serif",
		body: "'Inter', sans-serif",
		mono: "'ui-monospace', 'SFMono-Regular', Menlo, Monaco, Consolas, monospace",
	}),
	palette: Object.freeze({
		martianOrange: "#FF5A1F",
		dark: Object.freeze({
			background: "#07090E",
			surface: "#10141D",
			text: "#F6F7FB",
			mutedText: "#A9B1C1",
			border: "#202838",
		}),
		light: Object.freeze({
			background: "#F5F7FA",
			surface: "#FFFFFF",
			text: "#0D111A",
			mutedText: "#4B5565",
			border: "#D8DEE8",
		}),
	}),
	spacing: Object.freeze({
		unit: 8,
		sectionY: 96,
		containerMaxWidth: 1200,
	}),
	radius: Object.freeze({
		sm: 6,
		md: 10,
		lg: 16,
		xl: 24,
	}),
	motion: Object.freeze({
		reduceMotionByDefault: false,
		pageTransitionMs: 240,
		staggerMs: 80,
	}),
});
