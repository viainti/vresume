import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ children }: { children?: React.ReactNode }) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark" || (theme === "system" && systemTheme === "dark"));
    }
  }, [mounted, theme, systemTheme]);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="relative overflow-hidden">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const getThemeIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
    }
    return resolvedTheme === "dark" ? (
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    ) : (
      <Sun className="h-[1.2rem] w-[1.2rem]" />
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!children ? (
          <Button
            variant="outline"
            size="icon"
            className="relative overflow-hidden hover:bg-black/5 dark:hover:bg-white/10"
          >
            {getThemeIcon()}
            <span className="sr-only">Cambiar tema</span>
          </Button>
        ) : (
          children
        )}
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
  );
};

export default ThemeToggle;
