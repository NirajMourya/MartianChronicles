"use client";

import MuiContainer, {
	type ContainerProps as MuiContainerProps,
} from "@mui/material/Container";
import { forwardRef } from "react";

export type ContainerProps = MuiContainerProps;

/**
 * Shared page-width container aligned to design-system width.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
	function Container(props, ref) {
		return <MuiContainer ref={ref} maxWidth="lg" {...props} />;
	},
);
