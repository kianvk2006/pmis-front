import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function normalizeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getGaugeStatus(value) {
  if (value === null) {
    return {
      label: "بدون داده",
      color: "#94A3B8",
      textClass: "text-slate-500",
    };
  }

  if (value >= 1) {
    return {
      label: "مطلوب",
      color: "#22C55E",
      textClass: "text-green-600",
    };
  }

  if (value >= 0.9) {
    return {
      label: "نیازمند توجه",
      color: "#F97316",
      textClass: "text-orange-600",
    };
  }

  return {
    label: "نامطلوب",
    color: "#EF4444",
    textClass: "text-red-600",
  };
}

function formatValue(value) {
  if (value === null) {
    return "—";
  }

  return value.toLocaleString("fa-IR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function Gauge({ value, title, description }) {
  const normalizedValue = normalizeNumber(value);

  const status = getGaugeStatus(normalizedValue);

  /*
    حداکثر بازه نمایشی Gauge برابر 1.2 است.

    1.0 یعنی عملکرد مطابق برنامه.
    مقادیر بیشتر از 1 عملکرد بهتر از برنامه هستند.
  */

  const MAX_GAUGE_VALUE = 1.2;

  const gaugePercentage =
    normalizedValue === null
      ? 0
      : clamp((normalizedValue / MAX_GAUGE_VALUE) * 100, 0, 100);

  const data = [
    {
      name: "value",
      value: gaugePercentage,
    },

    {
      name: "remaining",
      value: 100 - gaugePercentage,
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      {(title || description) && (
        <div className="mb-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              {title && <h3 className="font-bold text-slate-900">{title}</h3>}

              {description && (
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              )}
            </div>

            <span
              className={`
                shrink-0
                rounded-full
                bg-slate-50
                px-3
                py-1
                text-xs
                font-bold
                ${status.textClass}
              `}
            >
              {status.label}
            </span>
          </div>
        </div>
      )}

      <div className="relative h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="72%"
              innerRadius={70}
              outerRadius={94}
              dataKey="value"
              stroke="none"
              isAnimationActive
              animationDuration={600}
            >
              <Cell fill={status.color} />

              <Cell fill="#E5E7EB" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 text-center">
          <div
            className={`
              text-4xl
              font-black
              ${status.textClass}
            `}
          >
            {formatValue(normalizedValue)}
          </div>

          <div className="mt-2 text-xs text-slate-400">شاخص عملکرد</div>
        </div>
      </div>

      <div className="mt-1 flex items-center justify-between px-3 text-xs text-slate-400">
        <span>۰</span>

        <span>۱</span>

        <span>۱٫۲+</span>
      </div>
    </div>
  );
}
