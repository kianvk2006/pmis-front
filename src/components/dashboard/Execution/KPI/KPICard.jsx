import { Truck, Route, TrendingUp, AlertTriangle } from "lucide-react";

const ICONS = {
  truck: Truck,
  route: Route,
  progress: TrendingUp,
  warning: AlertTriangle,
};

const COLORS = {
  green: "bg-emerald-500",
  blue: "bg-blue-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
};

export default function KPICard({ title, value, unit, change, icon, color }) {
  const Icon = ICONS[icon];

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
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-3 text-4xl font-bold">
            {value}

            <span className="mr-2 text-xl font-medium">{unit}</span>
          </h2>

          <p className="mt-4 text-sm text-emerald-600">{change}</p>
        </div>

        <div
          className={`
            ${COLORS[color]}
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            text-white
          `}
        >
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}
