
import { useState } from "react";
import { usePathname } from "@/lib/navigation";
import { useTranslations } from "@/i18n/compat/client";
import { Menu, Moon, Sun, X, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import LanguageSwitch from "@/components/shared/LanguageSwitch";
import ScrollHeader from "./client/ScrollHeader";
import MobileMenu from "./client/MobileMenu";
import GoDashboard from "./GoDashboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function LandingHeader() {
  const t = useTranslations("home");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const getThemeIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-[1.1rem] w-[1.1rem]" />;
    }
    return resolvedTheme === "dark" ? (
      <Moon className="h-[1.1rem] w-[1.1rem]" />
    ) : (
      <Sun className="h-[1.1rem] w-[1.1rem]" />
    );
  };

  return (
    <>
      <ScrollHeader>
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex items-center justify-between h-20">
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => (window.location.href = `/${locale}/`)}
            >
              <Logo size={48} />
              <span className="font-bold text-2xl tracking-tight text-black dark:text-white">
                VResume
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitch />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="w-9 h-9 relative cursor-pointer rounded-xl hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
                    {getThemeIcon()}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[120px]">
                  <DropdownMenuItem 
                    onClick={() => setTheme("light")}
                    className={cn(theme === "light" && "bg-black/5 dark:bg-white/10")}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Claro
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setTheme("dark")}
                    className={cn(theme === "dark" && "bg-black/5 dark:bg-white/10")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Oscuro
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setTheme("system")}
                    className={cn(theme === "system" && "bg-black/5 dark:bg-white/10")}
                  >
                    <Monitor className="mr-2 h-4 w-4" />
                    Sistema
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <GoDashboard>
                <Button
                  className="rounded-xl px-5 h-10 font-medium bg-white text-black hover:bg-gray-100 border-0 shadow-sm dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  {t("header.startButton")}
                </Button>
              </GoDashboard>
            </div>

            <button
              className="md:hidden p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-black dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-black dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </ScrollHeader>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        buttonText={t("header.startButton")}
      />
    </>
  );
}
