import type { ThemeOptions } from "@mui/material/styles";

import { spacingScale } from "./tokens";

export const themeSpacing = spacingScale.base;

/**
 * Shared spacing and container defaults for future layout modules.
 */
export const createSpacingConfig = (): Pick<ThemeOptions, "spacing"> => ({
	spacing: themeSpacing,
});
