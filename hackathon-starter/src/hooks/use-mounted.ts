"use client";

import { useEffect, useState } from "react";

/**
 * Returns a boolean representing if the component has mounted on the client-side.
 * Extremely useful for avoiding server hydration mismatch errors.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
