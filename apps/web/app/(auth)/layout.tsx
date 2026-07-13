import { BarcodeRule } from "@multi-inv/ui";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink">
            <div className="flex h-4 gap-[2px]">
              {[3, 6, 2, 5, 3].map((h, i) => (
                <span key={i} className="w-[2px] rounded-full bg-white/80" style={{ height: h * 2.2 }} />
              ))}
            </div>
          </div>
          <span className="mt-2.5 font-display text-[17px] font-semibold text-ink">Stockline</span>
          <BarcodeRule className="mt-3 opacity-60" />
        </div>

        <div className="rounded-xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(18,20,28,0.04)]">
          {children}
        </div>
      </div>
    </div>
  );
}
