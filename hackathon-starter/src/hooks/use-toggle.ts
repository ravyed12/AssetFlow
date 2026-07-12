"use client";

import { useCallback, useState } from "react";

/**
 * Simple hook to toggle a boolean value (e.g. open/close state of sidebar, modal).
 */
export function useToggle(
  initialValue = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  const setExplicit = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return [value, toggle, setExplicit];
}
