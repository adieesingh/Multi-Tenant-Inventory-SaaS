import { Bell, Plus, User, UserCircle2 } from "lucide-react";
import { AspectRatio, AspectRatioPortrait } from "./aspect-ratio";
import { Button } from "./button";

function ToolBar() {
  return (
    <nav className="bg-white sticky top-0 z-0  w-full h-16 items-center flex justify-between border-b px-4 md:px-8">
      <div className="gap-3 flex items-center">
        <img src="/logo.png" alt="logo" className="h-8 w-8 object-contain" />
        <span className="text-lg font-semibold ">StockFlow</span>
      </div>
      <div className="flex items-center gap-3">
          <Button className={"hidden sm:flex"}>
            + Add Organization
          </Button>
          <button className="rounded-md p-2 hover:bg-slate-100">
                  <Bell className="h-5"></Bell>
          </button>
          <button className="rounded-md p-2 hover:bg-slate-100">
            <UserCircle2 className="h-8 w-8"></UserCircle2>
          </button>
      </div>
    </nav>
  );
}

export { ToolBar };
