"use client";

import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import { forwardRef } from "react";

export interface CardProps extends MuiCardProps {}

/**
 * Content card with subtle border and no heavy shadow by default.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
	return (
		<MuiCard
			ref={ref}
			variant="outlined"
			elevation={0}
			sx={{ borderColor: "divider", ...props.sx }}
			{...props}
		/>
	);
});
