import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * A custom hook to determine if the current device is mobile based on window width.
 *
 * @returns {boolean} - True if the device is considered mobile, false otherwise.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    /**
     * Handles changes to the window width and updates the state of whether the application is on mobile.
     *
     * @function onChange
     * @global
     * @return {void} - This function does not return anything.
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
