import Box from "@mui/material/Box";
import type { HTMLAttributes } from "react";

export type InlineCodeProps = HTMLAttributes<HTMLElement>;

/**
 * Inline code renderer for MDX prose.
 */
export function InlineCode({ children, ...props }: InlineCodeProps) {
	return (
		<Box
			component="code"
			{...props}
			sx={{
				px: 0.45,
				py: 0.15,
				borderRadius: 1,
				fontFamily:
					"var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace)",
				fontSize: "0.875em",
				backgroundColor: "action.hover",
				color: "text.primary",
			}}
		>
			{children}
		</Box>
	);
}
