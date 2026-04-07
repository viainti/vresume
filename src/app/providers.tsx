"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";
import { useLocale } from "@/i18n/compat/client";

export function Providers({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="vresume-theme"
    >
      <HeroUIProvider locale={locale}>
        {children}
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
