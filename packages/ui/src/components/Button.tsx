import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-ink-700 focus-visible:ring-ink-700 disabled:bg-ink-300",
  secondary:
    "bg-white text-ink border border-line hover:bg-surface-100 focus-visible:ring-ink-300",
  ghost:
    "bg-transparent text-ink-600 hover:bg-surface-100 focus-visible:ring-ink-200",
  danger:
    "bg-danger text-white hover:bg-danger-600 focus-visible:ring-danger-300",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-5 text-[15px] gap-2 rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-60",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
