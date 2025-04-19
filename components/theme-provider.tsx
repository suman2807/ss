'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * Provides theme context to its children components.
 *
 * @param {Object} props - The component's props.
 * @prop {React.ReactNode} children - Elements that will be rendered within the theme provider.
 * @returns {JSX.Element} - A JSX element representing the themed children components.
 *
 * Example:
 * ```
 * <ThemeProvider>
 *   <MyComponent />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
