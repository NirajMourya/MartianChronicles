"use client";

import type { ChipProps } from "../ui";
import { Chip } from "../ui";

export interface TopicChipProps extends Omit<ChipProps, "label"> {
	readonly topic: string;
}

/**
 * Topic chip for mid-level content categorization.
 */
export function TopicChip({ topic, ...props }: TopicChipProps) {
	return <Chip label={topic} color="primary" variant="outlined" {...props} />;
}
