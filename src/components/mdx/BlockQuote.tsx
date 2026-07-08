import Box from "@mui/material/Box";
import type { BlockquoteHTMLAttributes } from "react";

export type BlockQuoteProps = BlockquoteHTMLAttributes<HTMLQuoteElement>;

/**
 * Styled blockquote for long-form reading surfaces.
 */
export function BlockQuote({ children, ...props }: BlockQuoteProps) {
	return (
		<Box
			component="blockquote"
			{...props}
			sx={{
				margin: "1.75rem 0",
				padding: "1rem 1.1rem",
				borderLeft: "4px solid",
				borderColor: "primary.main",
				backgroundColor: "action.hover",
				borderRadius: "0 14px 14px 0",
				color: "text.primary",
			}}
		>
			{children}
		</Box>
	);
}
