import type { Shadows } from "@mui/material/styles";

import type { ThemeMode } from "./tokens";

/**
 * Subtle elevation tuned for calm, reading-first surfaces.
 */
export const createShadows = (mode: ThemeMode): Shadows => {
	const shadowColor =
		mode === "dark"
			? "rgba(0, 0, 0, 0.55)"
			: "rgba(15, 24, 40, 0.14)";

	const values = Array.from({ length: 25 }, () => "none");
	values[1] = `0px 1px 2px ${shadowColor}`; // surface
	values[2] = `0px 3px 8px ${shadowColor}`; // floating
	values[4] = `0px 6px 20px ${shadowColor}`; // popover
	values[8] = `0px 12px 36px ${shadowColor}`; // dialog

	return values as Shadows;
};
