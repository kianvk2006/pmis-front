import {
  AlertTriangle,
  CircleCheck,
  CircleDollarSign,
  Clock3,
  ShieldAlert,
} from "lucide-react";

const ICONS = {
  schedule: Clock3,
  cost: CircleDollarSign,
  budget: ShieldAlert,
  warning: AlertTriangle,
  success: CircleCheck,
};

const STYLES = {
  critical: {
    container: "border-red-200 bg-red-50",
    icon: "bg-red-100 text-red-600",
    title: "text-red-700",
    badge: "bg-red-100 text-red-600",
    label: "بحرانی",
  },

  warning: {
    container: "border-orange-200 bg-orange-50",
    icon: "bg-orange-100 text-orange-600",
    title: "text-orange-700",
    badge: "bg-orange-100 text-orange-600",
    label: "هشدار",
  },

  success: {
    container: "border-green-200 bg-green-50",
    icon: "bg-green-100 text-green-600",
    title: "text-green-700",
    badge: "bg-green-100 text-green-600",
    label: "مطلوب",
  },

  info: {
    container: "border-blue-200 bg-blue-50",
    icon: "bg-blue-100 text-blue-600",
    title: "text-blue-700",
    badge: "bg-blue-100 text-blue-600",
    label: "اطلاع",
  },
};

export default function AlertItem({
  title,
  description,
  type = "info",
  icon = "warning",
}) {
  const config = STYLES[type] ?? STYLES.info;

  const Icon = ICONS[icon] ?? AlertTriangle;

  return (
    <article
      className={`
        rounded-2xl
        border
        p-4
        ${config.container}
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${config.icon}
          `}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4
              className={`
                font-bold
                ${config.title}
              `}
            >
              {title}
            </h4>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-bold
                ${config.badge}
              `}
            >
              {config.label}
            </span>
          </div>

          {description && (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
