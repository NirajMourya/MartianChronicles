"use client";

import CircularProgress from "@mui/material/CircularProgress";

import { Stack } from "../ui";
import { Text } from "./Text";

export interface LoadingStateProps {
	readonly label?: string;
}

/**
 * Reusable loading feedback for async boundaries.
 */
export function LoadingState({ label = "Loading..." }: LoadingStateProps) {
	return (
		<Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 6 }}>
			<CircularProgress size={24} aria-label={label} />
			<Text component="span">{label}</Text>
		</Stack>
	);
}
