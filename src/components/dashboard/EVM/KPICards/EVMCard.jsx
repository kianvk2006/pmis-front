const ICON_COLORS = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
  yellow: "bg-yellow-500",
  sky: "bg-sky-500",
  red: "bg-red-500",
  slate: "bg-slate-500",
};

const STATUS_CONFIG = {
  positive: {
    label: "مطلوب",
    className: "bg-green-50 text-green-600",
  },

  warning: {
    label: "نیازمند توجه",
    className: "bg-orange-50 text-orange-600",
  },

  negative: {
    label: "نامطلوب",
    className: "bg-red-50 text-red-600",
  },

  neutral: null,
};

function formatValue(value, maximumFractionDigits = 2) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toLocaleString("fa-IR", {
    maximumFractionDigits,
  });
}

export default function EVMCard({
  title,
  value,
  unit = "",
  icon: Icon,
  color = "orange",
  status = "neutral",
  maximumFractionDigits = 2,
}) {
  const iconColor = ICON_COLORS[color] ?? ICON_COLORS.orange;

  const statusConfig = STATUS_CONFIG[status] ?? null;

  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-6 text-slate-500">
            {title}
          </p>

          <div className="mt-5 flex flex-wrap items-end gap-2">
            <strong className="text-4xl font-black text-slate-800">
              {formatValue(value, maximumFractionDigits)}
            </strong>

            {unit && (
              <span className="pb-1 text-xs font-semibold text-slate-400">
                {unit}
              </span>
            )}
          </div>

          {statusConfig && (
            <div className="mt-4">
              <span
                className={`
                  inline-flex
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-bold
                  ${statusConfig.className}
                `}
              >
                {statusConfig.label}
              </span>
            </div>
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
            ${iconColor}
          `}
        >
          {Icon && <Icon size={28} />}
        </div>
      </div>
    </article>
  );
}
