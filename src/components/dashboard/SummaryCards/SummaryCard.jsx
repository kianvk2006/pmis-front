import Card from "@/components/ui/Card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function SummaryCard({
  title,
  value,
  unit,
  icon: Icon,
  color,
  iconColor,
  trend,
  positive,
}) {
  return (
    <Card
      className="
        group
        rounded-3xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-800">
            {value}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {unit}
          </p>

        </div>

        <div
          className={`
            ${color}
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            transition-all
            duration-300
            group-hover:scale-110
          `}
        >
          <Icon
            size={28}
            className={iconColor}
          />
        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <span
          className={`
            flex
            items-center
            gap-1
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold

            ${
              positive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {positive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {trend}
        </span>

        <span className="text-xs text-slate-400">
          نسبت به ماه قبل
        </span>

      </div>
    </Card>
  );
}