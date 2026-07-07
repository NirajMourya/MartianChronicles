"use client";

import MuiSkeleton, {
	type SkeletonProps as MuiSkeletonProps,
} from "@mui/material/Skeleton";
import { forwardRef } from "react";

export interface SkeletonProps extends MuiSkeletonProps {}

/**
 * Loading placeholder with default wave animation.
 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
	function Skeleton(props, ref) {
		return <MuiSkeleton ref={ref} animation="wave" {...props} />;
	},
);
