import { type ReactNode } from "react";

export function FormField({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium text-ink-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12px] text-danger-600">{error}</p>}
    </div>
  );
}
