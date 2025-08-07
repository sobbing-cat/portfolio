import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have cn utility

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "default" | "warning" | "danger" | "info";
}

export function Callout({
  children,
  type = "default",
  className,
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-lg border p-4",
        {
          "border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200":
            type === "default",
          "border-yellow-300 bg-yellow-50 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-200":
            type === "warning",
          "border-red-300 bg-red-50 text-red-800 dark:border-red-700 dark:bg-red-950 dark:text-red-200":
            type === "danger",
          "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-200":
            type === "info",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
