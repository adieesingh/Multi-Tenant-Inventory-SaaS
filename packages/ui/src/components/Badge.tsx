import { type HTMLAttributes } from "react";
import { cn } from "../cn";

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface-100 text-ink-600 ring-1 ring-inset ring-line",
  success: "bg-success-50 text-success-700 ring-1 ring-inset ring-success-200",
  warning: "bg-warn-50 text-warn-700 ring-1 ring-inset ring-warn-200",
  danger: "bg-danger-50 text-danger-700 ring-1 ring-inset ring-danger-200",
  info: "bg-accent-50 text-accent-700 ring-1 ring-inset ring-accent-200",
};

const dotClasses: Record<BadgeTone, string> = {
  neutral: "bg-ink-400",
  success: "bg-success-500",
  warning: "bg-warn-500",
  danger: "bg-danger-500",
  info: "bg-accent-500",
};

export function Badge({
  className,
  tone = "neutral",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium leading-none",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", dotClasses[tone])} />
      )}
      {children}
    </span>
  );
}
