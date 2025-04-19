"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

/**
 * A React component that wraps `ResizablePrimitive.PanelGroup` with additional styling and props handling.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} [props.className] - Additional CSS classes to apply to the panel group.
 * @returns {JSX.Element} - A React JSX element representing the resizable panel group.
 *
 * @example
 * // Basic usage of ResizablePanelGroup
 * <ResizablePanelGroup className="my-custom-class">
 *   {/* Content goes here */
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

/**
 * A component that renders a resizable handle for panels.
 *
 * @param {Object} props - The properties of the ResizableHandle component.
 * @property {boolean} [props.withHandle=false] - Determines whether to display the resize handle.
 * @property {string} [props.className=""] - Additional class names to apply to the resize handle.
 * @returns {React.ReactNode} - The JSX representation of the ResizableHandle component.
 *
 * @example
 * <ResizableHandle withHandle={true} className="custom-handle" />
 */
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
