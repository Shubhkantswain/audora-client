import { GripVertical } from "lucide-react"
import { cn } from "~/lib/utils"
import { useEffect, useState } from "react"

// Create a wrapper component that only renders on the client
const ClientOnlyResizable = ({
  withHandle,
  className,
  ...props
}: any) => {
  const [ResizablePrimitive, setResizablePrimitive] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    import("react-resizable-panels").then((module) => {
      setResizablePrimitive(module)
    })
  }, [])

  if (!isClient || !ResizablePrimitive) {
    // Return a fallback or null during SSR
    return null
  }

  return (
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
}

// Export components with client-side only rendering
export const ResizablePanelGroup = ({
  className,
  ...props
}: any) => {
  const [ResizablePrimitive, setResizablePrimitive] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    import("react-resizable-panels").then((module) => {
      setResizablePrimitive(module)
    })
  }, [])

  if (!isClient || !ResizablePrimitive) {
    return <div className={className} {...props} />
  }

  return (
    <ResizablePrimitive.PanelGroup
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

export const ResizablePanel = (props: any) => {
  const [ResizablePrimitive, setResizablePrimitive] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    import("react-resizable-panels").then((module) => {
      setResizablePrimitive(module)
    })
  }, [])

  if (!isClient || !ResizablePrimitive) {
    return <div {...props} />
  }

  return <ResizablePrimitive.Panel {...props} />
}

export const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: any) => {
  return (
    <ClientOnlyResizable
      withHandle={withHandle}
      className={className}
      {...props}
    />
  )
}