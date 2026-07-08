import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

import { ColorModeProvider } from "./ColorModeProvider";
import { ThemeProvider } from "./ThemeProvider";

export function AppProviders({ children }: { readonly children: ReactNode }) {
	return (
		<AppRouterCacheProvider>
			<ColorModeProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</ColorModeProvider>
		</AppRouterCacheProvider>
	);
}
