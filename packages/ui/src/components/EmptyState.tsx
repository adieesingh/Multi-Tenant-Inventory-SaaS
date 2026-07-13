import { type ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex gap-[3px]" aria-hidden="true">
        {[3, 6, 2, 5, 3].map((h, i) => (
          <span key={i} className="w-[3px] rounded-full bg-ink-200" style={{ height: h * 4 }} />
        ))}
      </div>
      <p className="font-display text-[15px] font-semibold text-ink">{title}</p>
      {description && <p className="max-w-xs text-[13px] text-ink-500">{description}</p>}
      {action}
    </div>
  );
}
