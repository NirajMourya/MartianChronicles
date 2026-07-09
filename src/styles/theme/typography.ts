import type { TypographyVariantsOptions } from "@mui/material/styles";

import { themeConfig } from "@/config/theme";

declare module "@mui/material/styles" {
	interface TypographyVariants {
		bodyLarge: React.CSSProperties;
		code: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		bodyLarge?: React.CSSProperties;
		code?: React.CSSProperties;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		bodyLarge: true;
		code: true;
	}
}

/**
 * Reading-first type scale with generous line-height and restrained contrast.
 */
export const createTypography = (): TypographyVariantsOptions => ({
	fontFamily: themeConfig.fonts.body,
	h1: {
		fontFamily: themeConfig.fonts.heading,
		fontSize: "clamp(2.25rem, 1.6rem + 2.2vw, 3.4rem)",
		lineHeight: 1.15,
		letterSpacing: "-0.02em",
		fontWeight: 700,
	},
	h2: {
		fontFamily: themeConfig.fonts.heading,
		fontSize: "clamp(1.9rem, 1.4rem + 1.6vw, 2.75rem)",
		lineHeight: 1.2,
		letterSpacing: "-0.015em",
		fontWeight: 700,
	},
	h3: {
		fontFamily: themeConfig.fonts.heading,
		fontSize: "clamp(1.6rem, 1.25rem + 1.2vw, 2.2rem)",
		lineHeight: 1.25,
		letterSpacing: "-0.01em",
		fontWeight: 650,
	},
	h4: {
		fontFamily: themeConfig.fonts.heading,
		fontSize: "clamp(1.35rem, 1.1rem + 0.8vw, 1.8rem)",
		lineHeight: 1.3,
		letterSpacing: "-0.005em",
		fontWeight: 650,
	},
	h5: {
		fontFamily: themeConfig.fonts.heading,
		fontSize: "clamp(1.18rem, 1.02rem + 0.55vw, 1.45rem)",
		lineHeight: 1.35,
		fontWeight: 600,
	},
	h6: {
		fontFamily: themeConfig.fonts.heading,
		fontSize: "1.05rem",
		lineHeight: 1.4,
		fontWeight: 600,
	},
	subtitle1: {
		fontSize: "1rem",
		lineHeight: 1.6,
		fontWeight: 500,
	},
	subtitle2: {
		fontSize: "0.9rem",
		lineHeight: 1.5,
		fontWeight: 500,
		textTransform: "uppercase",
		letterSpacing: "0.06em",
	},
	bodyLarge: {
		fontSize: "1.08rem",
		lineHeight: 1.85,
		fontWeight: 400,
	},
	body1: {
		fontSize: "1rem",
		lineHeight: 1.8,
		fontWeight: 400,
	},
	body2: {
		fontSize: "0.9375rem",
		lineHeight: 1.7,
		fontWeight: 400,
	},
	caption: {
		fontSize: "0.8125rem",
		lineHeight: 1.5,
		fontWeight: 400,
	},
	overline: {
		fontSize: "0.75rem",
		lineHeight: 1.4,
		fontWeight: 600,
		letterSpacing: "0.12em",
		textTransform: "uppercase",
	},
	code: {
		fontFamily: themeConfig.fonts.mono,
		fontSize: "0.9rem",
		lineHeight: 1.7,
		fontWeight: 400,
	},
});
