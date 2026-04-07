"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function useThemeReady() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    theme,
    setTheme,
    resolvedTheme,
    mounted,
    isDark: mounted && resolvedTheme === "dark",
    isLight: mounted && resolvedTheme === "light",
  };
}
