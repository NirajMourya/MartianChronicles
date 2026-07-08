import Box from "@mui/material/Box";
import type { HTMLAttributes } from "react";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {}

/**
 * Responsive table wrapper for MDX documents.
 */
export function Table({ children, ...props }: TableProps) {
	return (
		<Box sx={{ my: 3, width: "100%", overflowX: "auto", borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
			<table
				{...props}
				style={{
					width: "100%",
					borderCollapse: "separate",
					borderSpacing: 0,
					minWidth: 520,
					background: "inherit",
					fontSize: "0.95rem",
				}}
			>
				{children}
			</table>
		</Box>
	);
}
