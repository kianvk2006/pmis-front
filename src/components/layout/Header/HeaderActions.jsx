import {
  Bell,
  Moon,
} from "lucide-react";

import UserMenu from "./UserMenu";

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-5">

      <button
        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        bg-white
        border
        border-slate-200
        "
      >
        <Bell size={18} />
      </button>

      <button
        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        bg-white
        border
        border-slate-200
        "
      >
        <Moon size={18} />
      </button>

      <UserMenu />

    </div>
  );
}