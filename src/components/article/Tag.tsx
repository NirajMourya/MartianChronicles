"use client";

import type { ChipProps } from "../ui";
import { Chip } from "../ui";

export interface TagProps extends Omit<ChipProps, "label"> {
	readonly value: string;
}

/**
 * Article tag chip with normalized display style.
 */
export function Tag({ value, ...props }: TagProps) {
	return <Chip label={`#${value}`} size="small" {...props} />;
}
