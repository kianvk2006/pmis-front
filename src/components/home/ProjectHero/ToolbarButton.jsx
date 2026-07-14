import { cn } from "@/lib/utils";

export default function ToolbarButton({
  icon: Icon,
  label,
  variant = "default",
}) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-xl border px-2 py-1 text-sm font-medium transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-md",
        variant === "primary"
          ? "border-orange-500 bg-orange-500 text-white hover:bg-orange-600"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      )}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}