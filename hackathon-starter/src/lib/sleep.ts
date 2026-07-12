/**
 * Delays execution for a specified number of milliseconds
 * Useful for testing loading skeletons, mock fetches, or animations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
