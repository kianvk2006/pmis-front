import { AlertTriangle, Truck, CheckCircle2, Package } from "lucide-react";

const icons = {
  alert: AlertTriangle,
  truck: Truck,
  check: CheckCircle2,
  package: Package,
};

const colors = {
  red: {
    bg: "bg-red-500",
    text: "text-red-500",
  },

  orange: {
    bg: "bg-orange-500",
    text: "text-orange-500",
  },

  green: {
    bg: "bg-green-500",
    text: "text-green-500",
  },

  blue: {
    bg: "bg-blue-500",
    text: "text-blue-500",
  },
};

export default function KPICard({ item }) {
  const Icon = icons[item?.icon] ?? Package;

  const color = colors[item?.color] ?? colors.blue;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex justify-between gap-4">
        <div>
          <div
            className={`
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              ${color.bg}
            `}
          >
            <Icon className="text-white" size={26} />
          </div>
        </div>

        <div className="text-right">
          <p className="font-medium text-slate-500">{item.title}</p>

          <h2 className="mt-5 text-5xl font-black">{item.value}</h2>

          <p
            className={`
              mt-4
              text-sm
              ${color.text}
            `}
          >
            {item.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
