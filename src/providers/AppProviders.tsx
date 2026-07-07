import type { ReactNode } from "react";

import { ColorModeProvider } from "./ColorModeProvider";
import { ThemeProvider } from "./ThemeProvider";

export function AppProviders({ children }: { readonly children: ReactNode }) {
	return (
		<ColorModeProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</ColorModeProvider>
	);
}
