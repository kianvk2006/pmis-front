import {
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function KPIBox({
  title,
  value,
  unit = "",
  percent,
  color = "orange",
  icon: Icon,
  trend = "up",
}) {
  const colors = {
    orange: "bg-orange-500",
    green: "bg-emerald-500",
    blue: "bg-sky-500",
    red: "bg-red-500",
  };

  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-800">
            {value}
            <span className="mr-2 text-lg text-slate-500">
              {unit}
            </span>
          </h2>

        </div>

        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            text-white
            ${colors[color]}
          `}
        >
          <Icon size={30} />
        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <div
          className={`
          flex
          items-center
          gap-1
          rounded-full
          px-3
          py-1
          text-sm

          ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
          `}
        >

          {trend === "up" ? (
            <ArrowUp size={15} />
          ) : (
            <ArrowDown size={15} />
          )}

          {percent}%

        </div>

        <span className="text-sm text-slate-400">
          نسبت به ماه قبل
        </span>

      </div>
    </div>
  );
}