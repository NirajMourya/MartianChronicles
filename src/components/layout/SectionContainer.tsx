"use client";

import type { ReactNode } from "react";

import { Container, type ContainerProps, Section, type SectionProps } from "../ui";

export interface SectionContainerProps {
	readonly children: ReactNode;
	readonly sectionProps?: Omit<SectionProps, "ref">;
	readonly containerProps?: ContainerProps;
}

/**
 * Section + container composition helper for consistent spacing.
 */
export function SectionContainer({
	children,
	sectionProps,
	containerProps,
}: SectionContainerProps) {
	return (
		<Section {...sectionProps}>
			<Container {...containerProps}>{children}</Container>
		</Section>
	);
}
