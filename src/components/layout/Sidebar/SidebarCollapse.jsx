import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function SidebarCollapse({
  collapsed,
  setCollapsed,
}) {
  return (
    <button
      onClick={() => setCollapsed(!collapsed)}
      className="
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-xl
      text-slate-400
      transition-all
      duration-300
      hover:bg-slate-700
      hover:text-white
      active:scale-95
      "
    >
      {collapsed ? (
        <ChevronRight
          size={20}
          className="transition-transform duration-300"
        />
      ) : (
        <ChevronLeft
          size={20}
          className="transition-transform duration-300"
        />
      )}
    </button>
  );
}