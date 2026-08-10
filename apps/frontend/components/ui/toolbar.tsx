import { Plus, User } from "lucide-react";
import { AspectRatio, AspectRatioPortrait } from "./aspect-ratio";


function ToolBar() {
  return (
    <nav className="bg-blue-500 w-full h-16 items-center flex justify-between border-b px-6">
      <div className="gap-3 flex items-center">
        <img src="/logo.png" alt="logo"  className="h-15 w-25 rounded-md" />
        <span className="text-lg font-semibold">
     StockFlow
        </span>
                <div className="flex items-center">
                    <User size={22}> </User>
                </div>
      </div>
    </nav>
  );
}

export { ToolBar };
