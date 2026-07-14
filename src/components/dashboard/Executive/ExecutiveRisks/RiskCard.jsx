import {
  AlertTriangle,
  Clock3,
  DollarSign,
  ShieldAlert,
} from "lucide-react";

const icons = {
  risk: AlertTriangle,
  delay: Clock3,
  budget: DollarSign,
  safety: ShieldAlert,
};

const colors = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
};

export default function RiskCard({
  title,
  description,
  level,
  type,
}) {
  const Icon = icons[type];

  return (
    <div
      className="
      rounded-2xl
      border
      border-slate-200
      p-5
      transition-all
      duration-300
      hover:shadow-md
      hover:-translate-y-1
      "
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-slate-100 p-3">

            <Icon size={20} />

          </div>

          <div>

            <h4 className="font-bold text-slate-800">

              {title}

            </h4>

            <p className="mt-1 text-sm text-slate-500">

              {description}

            </p>

          </div>

        </div>

        <span
          className={`
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold
          ${colors[level]}
          `}
        >
          {level === "high"
            ? "بحرانی"
            : level === "medium"
            ? "متوسط"
            : "کم"}
        </span>

      </div>
    </div>
  );
}