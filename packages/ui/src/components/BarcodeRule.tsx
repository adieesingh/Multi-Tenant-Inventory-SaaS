import { cn } from "../cn";

/**
 * The product's signature motif: a strip of uneven bars, styled after a
 * barcode, used as a quiet divider under page headers. Widths are fixed
 * (not random) so the mark is stable across renders.
 */
const BAR_WIDTHS = [2, 1, 3, 1, 1, 4, 2, 1, 2, 1, 5, 1, 2, 3, 1, 1, 2, 4, 1, 2];

export function BarcodeRule({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex h-3 items-end gap-[3px]", className)}
      aria-hidden="true"
    >
      {BAR_WIDTHS.map((w, i) => (
        <span
          key={i}
          className="bg-ink-200"
          style={{ width: 2, height: `${w * 2 + 4}px` }}
        />
      ))}
    </div>
  );
}
