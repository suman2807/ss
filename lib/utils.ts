import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges multiple class names into a single string.
 *
 * @param {...ClassValue[]} inputs - An array of class values to merge.
 * @returns {string} A string containing all the merged class names.
 *
 * @example
 * // Returns "btn primary large"
 * cn('btn', 'primary', 'large')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
