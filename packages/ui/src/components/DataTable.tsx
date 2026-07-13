"use client";

import { type ReactNode } from "react";
import { cn } from "../cn";
import { EmptyState } from "./EmptyState";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyTitle = "Nothing here yet",
  emptyDescription = "Records will show up here once they're created.",
  onRowClick,
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={cn(
                  "px-5 py-3 text-[12px] font-medium uppercase tracking-wide text-ink-400",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  col.align === "left" || !col.align ? "text-left" : "",
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={() => onRowClick?.(row)}
              className={cn(
                "border-b border-line last:border-0",
                onRowClick && "cursor-pointer hover:bg-surface-50",
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "px-5 py-3.5 text-ink-700",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                  )}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
