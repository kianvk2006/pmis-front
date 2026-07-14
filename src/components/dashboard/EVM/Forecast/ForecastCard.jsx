import {
  Calculator,
  CircleDollarSign,
  Landmark,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";

const ICONS = {
  estimate: Calculator,
  remaining: CircleDollarSign,
  budget: Landmark,
  positive: TrendingUp,
  negative: TrendingDown,
  variance: WalletCards,
};

const COLORS = {
  blue: {
    icon: "bg-blue-500",
    value: "text-blue-600",
  },

  orange: {
    icon: "bg-orange-500",
    value: "text-orange-600",
  },

  green: {
    icon: "bg-green-500",
    value: "text-green-600",
  },

  red: {
    icon: "bg-red-500",
    value: "text-red-600",
  },

  slate: {
    icon: "bg-slate-500",
    value: "text-slate-700",
  },
};

function formatValue(value, maximumFractionDigits = 2) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toLocaleString("fa-IR", {
    maximumFractionDigits,
  });
}

export default function ForecastCard({
  title,
  value,
  unit = "",
  description,
  icon = "estimate",
  color = "blue",
}) {
  const Icon = ICONS[icon] ?? Calculator;

  const colorConfig = COLORS[color] ?? COLORS.blue;

  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <div className="mt-5 flex items-end gap-2">
            <strong className={`text-4xl font-black ${colorConfig.value}`}>
              {formatValue(value)}
            </strong>

            {unit && (
              <span className="pb-1 text-sm font-semibold text-slate-400">
                {unit}
              </span>
            )}
          </div>

          {description && (
            <p className="mt-4 text-sm leading-6 text-slate-500">
              {description}
            </p>
          )}
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            text-white
            ${colorConfig.icon}
          `}
        >
          <Icon size={26} />
        </div>
      </div>
    </article>
  );
}
