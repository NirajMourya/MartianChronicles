"use client";

import { useColorModeContext } from "@/providers/ColorModeProvider";

/**
 * Reusable application-level theme mode hook.
 */
export const useThemeMode = () => useColorModeContext();
