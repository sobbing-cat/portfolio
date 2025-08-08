import { cn } from "@/lib/utils"
import React from "react"

export default function CornerFrame({
  children,
  className,
  contentClassName,
}: {
  children: React.ReactNode
  className?: string
  contentClassName?: string
}) {
  return (
    <section className={cn("relative rounded-[8px] border bg-muted", className)}>
      {/* Corner Accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-10 w-10 rounded-tl-[8px] border-l-2 border-t-2 border-foreground/80" />
        <div className="absolute top-0 right-0 h-10 w-10 rounded-tr-[8px] border-r-2 border-t-2 border-foreground/80" />
        <div className="absolute bottom-0 left-0 h-10 w-10 rounded-bl-[8px] border-b-2 border-l-2 border-foreground/80" />
        <div className="absolute bottom-0 right-0 h-10 w-10 rounded-br-[8px] border-b-2 border-r-2 border-foreground/80" />
      </div>
      <div className={cn("relative h-full w-full p-4 sm:p-6 lg:p-8", contentClassName)}>{children}</div>
    </section>
  )
}
