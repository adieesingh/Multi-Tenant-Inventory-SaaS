import { type ReactNode } from "react";
import { cn } from "../cn";
import { Card } from "./Card";

export function StatCard({
  label,
  value,
  delta,
  deltaTone = "neutral",
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
  icon?: ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-medium text-ink-500">{label}</p>
        {icon && <div className="text-ink-300">{icon}</div>}
      </div>
      <p className="mt-3 font-mono text-[26px] font-semibold tabular-nums text-ink">
        {value}
      </p>
      {delta && (
        <p
          className={cn(
            "mt-1.5 text-[12px] font-medium",
            deltaTone === "up" && "text-success-600",
            deltaTone === "down" && "text-danger-600",
            deltaTone === "neutral" && "text-ink-400",
          )}
        >
          {delta}
        </p>
      )}
    </Card>
  );
}
