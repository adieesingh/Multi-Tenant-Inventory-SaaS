import { type ComponentType, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../cn";
import { BarcodeRule } from "./BarcodeRule";

export interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

interface LinkProps {
  href: string;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

export function Sidebar({
  orgName,
  sections,
  activeHref,
  LinkComponent,
  footer,
  open = false,
  onClose,
}: {
  orgName: string;
  sections: NavSection[];
  activeHref: string;
  LinkComponent: ComponentType<any>;
  footer?: ReactNode;
  /** Controls visibility on mobile (< lg). Ignored at lg+, where the sidebar is always visible. */
  open?: boolean;
  onClose?: () => void;
}) {
  const Link = LinkComponent;

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-dvh w-60 shrink-0 flex-col overflow-y-auto bg-ink px-3 py-5",
          "transition-transform duration-200 ease-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
              <div className="flex h-3.5 gap-[2px]">
                {[3, 6, 2, 5, 3].map((h, i) => (
                  <span key={i} className="w-[2px] rounded-full bg-white/80" style={{ height: h * 2 }} />
                ))}
              </div>
            </div>
            <span className="font-display text-[15px] font-semibold text-white">Stockline</span>
          </div>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>
        <p className="mt-2 truncate px-2 text-[12px] text-white/40">{orgName}</p>

        <nav className="mt-6 flex-1 space-y-5 px-1">
          {sections.map((section, i) => (
            <div key={i}>
              {section.label && (
                <p className="mb-1.5 px-2 text-[11px] font-medium uppercase tracking-[0.08em] text-white/30">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = activeHref === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
                        active
                          ? "bg-white text-ink"
                          : "text-white/60 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="shrink-0 px-2 pt-4">
          <BarcodeRule className="mb-4 opacity-30 [&>span]:!bg-white" />
          <Link
            href="/organizations/new"
            onClick={onClose}
            className="mb-2 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] font-medium text-white/50 hover:bg-white/10 hover:text-white"
          >
            + New organization
          </Link>
          {footer}
        </div>
      </aside>
    </>
  );
}
