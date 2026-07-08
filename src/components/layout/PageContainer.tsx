"use client";

import type { ContainerProps } from "../ui";
import { Container } from "../ui";

export type PageContainerProps = ContainerProps;

/**
 * Standard page-level width wrapper.
 */
export function PageContainer(props: PageContainerProps) {
	return <Container {...props} />;
}
