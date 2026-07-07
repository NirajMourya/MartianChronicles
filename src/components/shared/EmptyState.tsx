"use client";

import Box from "@mui/material/Box";
import type { ReactNode } from "react";

import { Heading } from "./Heading";
import { Text } from "./Text";
import { Stack } from "../ui";

export interface EmptyStateProps {
	readonly title: string;
	readonly description?: string;
	readonly action?: ReactNode;
	readonly icon?: ReactNode;
}

/**
 * Reusable empty-state block for zero-data views.
 */
export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			textAlign="center"
			spacing={2}
			sx={{ py: { xs: 6, md: 10 } }}
		>
			{icon ? <Box aria-hidden="true">{icon}</Box> : null}
			<Heading level={3}>{title}</Heading>
			{description ? <Text>{description}</Text> : null}
			{action ? <Box>{action}</Box> : null}
		</Stack>
	);
}
