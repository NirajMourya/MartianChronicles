"use client";

import Paper, { type PaperProps } from "@mui/material/Paper";
import { forwardRef } from "react";

export interface SurfaceProps extends PaperProps {}

/**
 * Themed surface block for grouped content sections.
 */
export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(function Surface(
	props,
	ref,
) {
	return (
		<Paper
			ref={ref}
			variant="outlined"
			elevation={0}
			sx={{ backgroundColor: "background.paper", ...props.sx }}
			{...props}
		/>
	);
});
