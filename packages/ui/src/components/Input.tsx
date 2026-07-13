import {
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  forwardRef,
} from "react";
import { cn } from "../cn";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-300",
      "focus:outline-none focus:ring-2 focus:ring-ink-200",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink",
      "focus:outline-none focus:ring-2 focus:ring-ink-200",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
