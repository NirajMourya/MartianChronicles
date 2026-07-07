"use client";

import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";

import { Stack } from "../ui";
import { Text } from "../shared";

export interface ReadingTimeProps {
	readonly minutes: number;
}

/**
 * Displays article reading duration in minutes.
 */
export function ReadingTime({ minutes }: ReadingTimeProps) {
	return (
		<Stack direction="row" spacing={0.75} alignItems="center" component="span">
			<AccessTimeRounded fontSize="inherit" aria-hidden="true" />
			<Text component="span" variant="caption" color="text.secondary">
				{minutes} min read
			</Text>
		</Stack>
	);
}
