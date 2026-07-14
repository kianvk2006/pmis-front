import Typography from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

export default function StatusItem({
  icon: Icon,
  label,
  value,
  color = "text-slate-600",
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">

      <div className="flex items-center gap-3">

        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm",
            color
          )}
        >
          <Icon size={18} />
        </div>

        <Typography>
          {label}
        </Typography>

      </div>

      <Typography className="font-semibold">
        {value}
      </Typography>

    </div>
  );
}