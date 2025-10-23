import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a UNIX timestamp to a readable time string
 * @param timestamp UNIX timestamp in seconds
 * @returns Formatted time string (e.g., "04:20 PM")
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Format a UNIX timestamp to a short time string for charts
 * @param timestamp UNIX timestamp in seconds
 * @returns Formatted time string (e.g., "16:20")
 */
export function formatChartTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}