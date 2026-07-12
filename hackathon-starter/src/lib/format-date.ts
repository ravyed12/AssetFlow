import { format, formatDistanceToNow, parseISO } from "date-fns";

/**
 * Parses and formats a date to a standard readable format: "MMM d, yyyy" (e.g. Oct 14, 2023)
 */
export function formatDate(date: Date | string | number): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : new Date(date);
  return format(parsedDate, "MMM d, yyyy");
}

/**
 * Formats a date to full datetime representation: "MMM d, yyyy h:mm a"
 */
export function formatDateTime(date: Date | string | number): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : new Date(date);
  return format(parsedDate, "MMM d, yyyy h:mm a");
}

/**
 * Returns a relative time string: "3 days ago" or "in 2 hours"
 */
export function formatRelativeTime(date: Date | string | number): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : new Date(date);
  return formatDistanceToNow(parsedDate, { addSuffix: true });
}
