"use client";

import Typography, { type TypographyProps } from "@mui/material/Typography";
import { forwardRef } from "react";

export interface TextProps extends TypographyProps {}

/**
 * Body text primitive with readable defaults.
 */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
	props,
	ref,
) {
	return <Typography ref={ref} variant="body1" color="text.secondary" {...props} />;
});
