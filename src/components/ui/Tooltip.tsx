"use client";

import MuiTooltip, {
	type TooltipProps as MuiTooltipProps,
} from "@mui/material/Tooltip";

export type TooltipProps = MuiTooltipProps;

/**
 * Tooltip wrapper to keep a consistent transition and placement default.
 */
export function Tooltip(props: TooltipProps) {
	return <MuiTooltip arrow placement="top" enterDelay={180} {...props} />;
}
