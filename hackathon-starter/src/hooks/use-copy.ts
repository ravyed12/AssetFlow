"use client";

import { useCallback, useState } from "react";

/**
 * Reusable copy-to-clipboard hook providing a temporary feedback state.
 */
export function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (typeof window === "undefined" || !navigator.clipboard) {
        console.warn("Clipboard API not supported in this browser.");
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (error) {
        console.warn("Copy to clipboard failed:", error);
        setCopied(false);
        return false;
      }
    },
    [timeout]
  );

  return { copied, copy };
}
