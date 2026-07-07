import { themeConfig } from "@/config/theme";

export type ThemeMode = "light" | "dark";

export interface SemanticTokens {
	readonly background: {
		readonly page: string;
		readonly surface: string;
		readonly elevated: string;
		readonly overlay: string;
	};
	readonly text: {
		readonly primary: string;
		readonly secondary: string;
		readonly muted: string;
		readonly inverse: string;
	};
	readonly border: {
		readonly subtle: string;
		readonly default: string;
		readonly strong: string;
	};
	readonly brand: {
		readonly main: string;
		readonly hover: string;
		readonly active: string;
	};
	readonly status: {
		readonly success: string;
		readonly warning: string;
		readonly error: string;
		readonly info: string;
	};
	readonly code: {
		readonly inlineBackground: string;
		readonly blockBackground: string;
		readonly border: string;
	};
	readonly link: {
		readonly default: string;
		readonly hover: string;
		readonly visited: string;
	};
	readonly selection: {
		readonly background: string;
		readonly text: string;
	};
	readonly scrollbar: {
		readonly thumb: string;
		readonly thumbHover: string;
		readonly track: string;
	};
	readonly focusRing: string;
}

export interface DesignTokens {
	readonly mode: ThemeMode;
	readonly semantic: SemanticTokens;
}

export const breakpoints = Object.freeze({
	xs: 0,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
});

/**
 * Spacing is based on Material UI's 8px grid to avoid magic numbers.
 */
export const spacingScale = Object.freeze({
	base: themeConfig.spacing.unit,
	sectionY: themeConfig.spacing.sectionY,
	containerMaxWidth: themeConfig.spacing.containerMaxWidth,
});

export const radiusScale = Object.freeze({
	small: themeConfig.radius.sm,
	medium: themeConfig.radius.md,
	large: themeConfig.radius.lg,
	pill: 999,
	round: 9999,
});

export const motionTokens = Object.freeze({
	duration: Object.freeze({
		fast: 120,
		normal: themeConfig.motion.pageTransitionMs,
		slow: 320,
		page: themeConfig.motion.pageTransitionMs,
	}),
	easing: Object.freeze({
		standard: "cubic-bezier(0.2, 0, 0, 1)",
		decelerate: "cubic-bezier(0, 0, 0.2, 1)",
		accelerate: "cubic-bezier(0.4, 0, 1, 1)",
	}),
	interaction: Object.freeze({
		hover: 160,
		focus: 120,
		pageTransition: themeConfig.motion.pageTransitionMs,
	}),
	reducedMotion: themeConfig.motion.reduceMotionByDefault,
});

const darkTokens: DesignTokens = Object.freeze({
	mode: "dark",
	semantic: Object.freeze({
		background: Object.freeze({
			page: themeConfig.palette.dark.background,
			surface: themeConfig.palette.dark.surface,
			elevated: "#151B27",
			overlay: "rgba(8, 11, 17, 0.78)",
		}),
		text: Object.freeze({
			primary: themeConfig.palette.dark.text,
			secondary: "#CFD5E2",
			muted: themeConfig.palette.dark.mutedText,
			inverse: "#0C1017",
		}),
		border: Object.freeze({
			subtle: "rgba(255, 255, 255, 0.08)",
			default: themeConfig.palette.dark.border,
			strong: "rgba(255, 255, 255, 0.2)",
		}),
		brand: Object.freeze({
			main: themeConfig.palette.martianOrange,
			hover: "#FF6E3A",
			active: "#E54B15",
		}),
		status: Object.freeze({
			success: "#35B46A",
			warning: "#E6A23C",
			error: "#E06262",
			info: "#4FA3FF",
		}),
		code: Object.freeze({
			inlineBackground: "rgba(255, 255, 255, 0.08)",
			blockBackground: "#0F141E",
			border: "#2A3347",
		}),
		link: Object.freeze({
			default: "#7FB6FF",
			hover: "#A3CBFF",
			visited: "#C1A9FF",
		}),
		selection: Object.freeze({
			background: "rgba(255, 90, 31, 0.35)",
			text: themeConfig.palette.dark.text,
		}),
		scrollbar: Object.freeze({
			thumb: "rgba(198, 208, 224, 0.24)",
			thumbHover: "rgba(198, 208, 224, 0.42)",
			track: "rgba(198, 208, 224, 0.08)",
		}),
		focusRing: "rgba(255, 90, 31, 0.62)",
	}),
});

const lightTokens: DesignTokens = Object.freeze({
	mode: "light",
	semantic: Object.freeze({
		background: Object.freeze({
			page: themeConfig.palette.light.background,
			surface: themeConfig.palette.light.surface,
			elevated: "#EEF2F8",
			overlay: "rgba(15, 20, 31, 0.14)",
		}),
		text: Object.freeze({
			primary: themeConfig.palette.light.text,
			secondary: "#253245",
			muted: themeConfig.palette.light.mutedText,
			inverse: "#F6F8FB",
		}),
		border: Object.freeze({
			subtle: "rgba(12, 18, 31, 0.08)",
			default: themeConfig.palette.light.border,
			strong: "rgba(12, 18, 31, 0.22)",
		}),
		brand: Object.freeze({
			main: themeConfig.palette.martianOrange,
			hover: "#E6531D",
			active: "#CC4516",
		}),
		status: Object.freeze({
			success: "#2C8D55",
			warning: "#AD6E1F",
			error: "#C23B3B",
			info: "#2A74D9",
		}),
		code: Object.freeze({
			inlineBackground: "rgba(12, 18, 31, 0.07)",
			blockBackground: "#F2F5FA",
			border: "#D4DBE7",
		}),
		link: Object.freeze({
			default: "#245FB4",
			hover: "#1E5098",
			visited: "#6A53A6",
		}),
		selection: Object.freeze({
			background: "rgba(255, 90, 31, 0.22)",
			text: themeConfig.palette.light.text,
		}),
		scrollbar: Object.freeze({
			thumb: "rgba(37, 50, 69, 0.28)",
			thumbHover: "rgba(37, 50, 69, 0.45)",
			track: "rgba(37, 50, 69, 0.08)",
		}),
		focusRing: "rgba(255, 90, 31, 0.58)",
	}),
});

export const tokensByMode: Readonly<Record<ThemeMode, DesignTokens>> =
	Object.freeze({
		dark: darkTokens,
		light: lightTokens,
	});
