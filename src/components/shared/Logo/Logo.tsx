"use client";

import Box from "@mui/material/Box";
import { forwardRef } from "react";

export type LogoVariant = "horizontal" | "emblem" | "wordmark";
export type LogoSize = "sm" | "md" | "lg" | "xl";

export interface LogoProps {
	readonly variant?: LogoVariant;
	readonly size?: LogoSize;
	readonly className?: string;
	readonly ariaLabel?: string;
}

const SIZE_MAP: Readonly<Record<LogoSize, number>> = Object.freeze({
	sm: 24,
	md: 32,
	lg: 48,
	xl: 64,
});

const getDimensions = (variant: LogoVariant, size: LogoSize) => {
	const base = SIZE_MAP[size];
	if (variant === "horizontal") {
		return { width: Math.round(base * 4.6), height: base };
	}

	if (variant === "wordmark") {
		return { width: Math.round(base * 4), height: Math.round(base * 0.85) };
	}

	return { width: base, height: base };
};

const EmblemGlyph = () => (
	<g>
		<circle cx="64" cy="64" r="40" stroke="currentColor" strokeWidth="8" fill="none" />
		<ellipse
			cx="64"
			cy="64"
			rx="56"
			ry="34"
			transform="rotate(-18 64 64)"
			stroke="#FF5A1F"
			strokeWidth="6"
			fill="none"
		/>
		<rect x="46" y="46" width="8" height="34" rx="3" fill="currentColor" />
		<rect x="60" y="40" width="8" height="46" rx="3" fill="#FF5A1F" />
		<rect x="74" y="50" width="8" height="28" rx="3" fill="currentColor" />
	</g>
);

/**
 * Brand logo primitive with placeholder SVG geometry.
 *
 * The API remains stable when replacing with final assets later.
 */
export const Logo = forwardRef<HTMLSpanElement, LogoProps>(function Logo(
	{ variant = "horizontal", size = "md", className, ariaLabel },
	ref,
) {
	const dimensions = getDimensions(variant, size);
	const label = ariaLabel ?? "Martian Chronicles";

	const renderWordmark = variant === "wordmark" || variant === "horizontal";
	const renderEmblem = variant === "emblem" || variant === "horizontal";

	return (
		<Box
			ref={ref}
			className={className}
			component="span"
			display="inline-flex"
			alignItems="center"
			lineHeight={0}
			sx={{ color: "text.primary" }}
		>
			<svg
				role="img"
				aria-label={label}
				viewBox="0 0 640 160"
				width={dimensions.width}
				height={dimensions.height}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				{renderEmblem ? (
					<g transform={variant === "emblem" ? "translate(256 16)" : "translate(16 16)"}>
						<EmblemGlyph />
					</g>
				) : null}
				{renderWordmark ? (
					<g
						transform={
							variant === "wordmark" ? "translate(16 18)" : "translate(136 18)"
						}
					>
						<text
							x="0"
							y="56"
							fill="currentColor"
							fontSize="56"
							fontFamily="Space Grotesk, Inter, sans-serif"
							fontWeight="600"
							letterSpacing="0.4"
						>
							Martian
						</text>
						<text
							x="0"
							y="112"
							fill="currentColor"
							opacity="0.82"
							fontSize="51"
							fontFamily="Space Grotesk, Inter, sans-serif"
							fontWeight="500"
							letterSpacing="0.25"
						>
							Chronicles
						</text>
					</g>
				) : null}
			</svg>
		</Box>
	);
});
