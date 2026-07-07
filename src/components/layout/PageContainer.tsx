"use client";

import type { ContainerProps } from "../ui";
import { Container } from "../ui";

export interface PageContainerProps extends ContainerProps {}

/**
 * Standard page-level width wrapper.
 */
export function PageContainer(props: PageContainerProps) {
	return <Container {...props} />;
}
