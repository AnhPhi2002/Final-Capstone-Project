// src/components/ui/paragraph.tsx
import { cn } from "@/lib/utils";
import * as React from "react";

export function Paragraph({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
