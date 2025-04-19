import { cn } from "@/lib/utils"

/**
 * A component that renders a skeleton UI element.
 *
 * @param {Object} props - The properties for the Skeleton component.
 * @param {string} [props.className] - Additional CSS class names to be applied to the skeleton.
 * @returns {JSX.Element} The rendered Skeleton component.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
