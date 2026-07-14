import { Moon } from "lucide-react";

export default function ThemeToggle() {
  return (
    <button
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        bg-slate-100
        transition-all
        hover:bg-slate-200
      "
    >
      <Moon size={20} />
    </button>
  );
}