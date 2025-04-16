"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { setTheme, theme } = useTheme()

  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <Button
        variant="ghost"
        size="icon"
        className="relative focus-visible:ring-0 focus-visible:ring-offset-0"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
} 