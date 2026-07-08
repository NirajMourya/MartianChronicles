"use client";

import MuiBadge, { type BadgeProps as MuiBadgeProps } from "@mui/material/Badge";
import { forwardRef } from "react";

export type BadgeProps = MuiBadgeProps;

/**
 * Inline status/count badge.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(props, ref) {
	return <MuiBadge ref={ref} color="primary" {...props} />;
});
