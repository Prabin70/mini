"use client";

import { useEffect } from "react";
import { useLocalStorage } from "./use-local-storage";

export const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(colorMode as string);
  }, [colorMode]);

  return [colorMode, setColorMode];
};
