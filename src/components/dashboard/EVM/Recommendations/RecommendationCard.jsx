import {
  BadgeDollarSign,
  ChartNoAxesCombined,
  CircleCheckBig,
  ClockArrowDown,
  ListChecks,
} from "lucide-react";

const ICONS = {
  scheduleCritical: ClockArrowDown,
  scheduleWarning: ListChecks,
  costCritical: BadgeDollarSign,
  costWarning: ChartNoAxesCombined,
  success: CircleCheckBig,
};

const STYLES = {
  high: {
    icon: "bg-red-50 text-red-600",
    badge: "bg-red-50 text-red-600",
    label: "اولویت بالا",
  },

  medium: {
    icon: "bg-orange-50 text-orange-600",
    badge: "bg-orange-50 text-orange-600",
    label: "اولویت متوسط",
  },

  normal: {
    icon: "bg-green-50 text-green-600",
    badge: "bg-green-50 text-green-600",
    label: "پیشنهاد",
  },
};

export default function RecommendationCard({
  title,
  description,
  priority = "normal",
  icon = "success",
}) {
  const config = STYLES[priority] ?? STYLES.normal;

  const Icon = ICONS[icon] ?? CircleCheckBig;

  return (
    <article className="rounded-2xl border border-slate-200 p-4">
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
            <h4 className="font-bold text-slate-800">{title}</h4>

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
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
