"use client";

import { useState, useEffect } from "react";

type SetValue<T> = T | ((val: T) => T);

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const valueToStore =
        typeof storedValue === "function"
          ? (storedValue as (val: T) => T)(storedValue)
          : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {}
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
