"use client";

import React from "react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon, SunMoonIcon } from "lucide-react";
import { useColorMode } from "@/hooks/use-color-mode";
import { cn } from "@/lib/utils";

export const AnimatedThemeToggle = () => {
  const [colorMode, setColorMode] = useColorMode();

  const toggleColorMode = () => {
    if (typeof setColorMode === "function") {
      setColorMode(colorMode === "light" ? "dark" : "light");
    }
  };

  return (
    <motion.button
      onClick={toggleColorMode}
      className={cn(
        "relative flex h-8 w-16 cursor-pointer items-center rounded-full p-1 transition-colors shadow-sm border duration-300",
        colorMode === "dark" ? "bg-background" : "bg-muted"
      )}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
    >
      <span className="sr-only">Toggle color mode</span>

      <span className="absolute left-2 z-10 text-foreground opacity-0 transition-opacity duration-200 ease-in-out dark:opacity-100">
        <MoonIcon className="size-4" />
      </span>
      <span className="absolute right-2 z-10 text-foreground opacity-100 transition-opacity duration-200 ease-in-out dark:opacity-0">
        <SunIcon className="size-4" />
      </span>

      <motion.div
        className="absolute z-20 flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-md"
        initial={false}
        animate={{
          x: colorMode === "dark" ? 32 : 2,
          rotate: colorMode === "dark" ? 40 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 50,
          duration: 0.2,
        }}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: colorMode === "dark" ? 0 : 180,
            opacity: [1, 0, 1],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.4,
            opacity: { duration: 0.2 },
          }}
        >
          <SunMoonIcon size={16} className="text-primary-foreground" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};
