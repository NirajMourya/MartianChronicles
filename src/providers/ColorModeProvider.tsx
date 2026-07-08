"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { themeConfig, type ThemeMode } from "@/config/theme";

const THEME_STORAGE_KEY = "mc.theme.mode";

interface ColorModeContextValue {
	readonly mode: ThemeMode;
	readonly setMode: (mode: ThemeMode) => void;
	readonly toggleMode: () => void;
	readonly isDarkMode: boolean;
}

const ColorModeContext = createContext<ColorModeContextValue | null>(null);

const isThemeMode = (value: string | null): value is ThemeMode =>
	value === "light" || value === "dark";

const getSystemPreferredMode = (): ThemeMode => {
	if (typeof window === "undefined") {
		return themeConfig.defaultMode;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

const resolveInitialMode = (): ThemeMode => {
	if (typeof window === "undefined") {
		return themeConfig.defaultMode;
	}

	const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
	if (isThemeMode(stored)) {
		return stored;
	}

	return getSystemPreferredMode();
};

export function ColorModeProvider({ children }: { readonly children: ReactNode }) {
	const [mode, setModeState] = useState<ThemeMode>(resolveInitialMode);

	const setMode = (nextMode: ThemeMode) => {
		setModeState(nextMode);
		if (typeof window !== "undefined") {
			window.localStorage.setItem(THEME_STORAGE_KEY, nextMode);
		}
	};

	const toggleMode = () => {
		setMode(mode === "dark" ? "light" : "dark");
	};

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleSystemModeChange = (event: MediaQueryListEvent) => {
			const persisted = window.localStorage.getItem(THEME_STORAGE_KEY);
			if (!persisted) {
				setModeState(event.matches ? "dark" : "light");
			}
		};

		mediaQuery.addEventListener("change", handleSystemModeChange);
		return () => mediaQuery.removeEventListener("change", handleSystemModeChange);
	}, []);

	const value = useMemo<ColorModeContextValue>(
		() => ({
			mode,
			setMode,
			toggleMode,
			isDarkMode: mode === "dark",
		}),
		[mode],
	);

	return (
		<ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>
	);
}

export const useColorModeContext = (): ColorModeContextValue => {
	const context = useContext(ColorModeContext);
	if (!context) {
		throw new Error("useColorModeContext must be used within ColorModeProvider.");
	}

	return context;
};
