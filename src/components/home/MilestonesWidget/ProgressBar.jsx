import { cn } from "@/lib/utils";

export default function ProgressBar({
  value,
  color = "bg-orange-500",
}) {
  return (
    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500",
          color
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}