import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to determine if the current device is mobile.
 *
 * This hook uses the `window.matchMedia` API to listen for changes in the screen width and updates the state accordingly.
 * It returns a boolean indicating whether the current viewport width is less than the specified mobile breakpoint.
 *
 * @returns {boolean} - True if the device is mobile, otherwise false. Returns undefined initially until the media query event fires.
 *
 * @example
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // Mobile-specific logic here
 * }
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    /**
     * Handles changes to determine if the current device is mobile.
     *
     * This function checks the window's inner width against a predefined MOBILE_BREAKPOINT value.
     * If the width is less than the breakpoint, it sets the `isMobile` state to true; otherwise, it sets it to false.
     *
     * @returns {void}
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
