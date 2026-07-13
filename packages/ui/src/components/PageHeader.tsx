import { type ReactNode } from "react";
import { BarcodeRule } from "./BarcodeRule";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-ink-400">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-[26px] font-semibold tracking-tight text-ink">
          {title}
        </h1>
        {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
        <BarcodeRule className="mt-3" />
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
