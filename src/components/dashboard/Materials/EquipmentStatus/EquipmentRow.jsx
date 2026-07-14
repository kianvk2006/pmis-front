const statusConfig = {
  active: {
    label: "فعال",
    className: "bg-green-100 text-green-700",
  },

  working: {
    label: "فعال",
    className: "bg-green-100 text-green-700",
  },

  operational: {
    label: "فعال",
    className: "bg-green-100 text-green-700",
  },

  maintenance: {
    label: "سرویس",
    className: "bg-orange-100 text-orange-700",
  },

  service: {
    label: "سرویس",
    className: "bg-orange-100 text-orange-700",
  },

  repair: {
    label: "تعمیر",
    className: "bg-orange-100 text-orange-700",
  },

  broken: {
    label: "خراب",
    className: "bg-red-100 text-red-700",
  },

  inactive: {
    label: "غیرفعال",
    className: "bg-slate-100 text-slate-600",
  },
};

function normalizeStatus(status) {
  return String(status ?? "")
    .trim()
    .toLowerCase();
}

function formatHours(value) {
  const hours = Number(value) || 0;

  return hours.toLocaleString("fa-IR", {
    maximumFractionDigits: 2,
  });
}

export default function EquipmentRow({ item }) {
  const normalizedStatus = normalizeStatus(item.status);

  const status = statusConfig[normalizedStatus] ?? {
    label: item.status || "نامشخص",
    className: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-800">{item.name}</h4>

          <p className="mt-1 text-sm text-slate-500">{item.code}</p>
        </div>

        <span
          className={`
            whitespace-nowrap
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${status.className}
          `}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-500">مجموع ساعات کارکرد</span>

          <span className="font-bold text-slate-700">
            {formatHours(item.hours)} ساعت
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-500">تعداد رکوردهای ثبت‌شده</span>

          <span className="font-bold text-slate-700">
            {Number(item.recordCount || 0).toLocaleString("fa-IR")}
          </span>
        </div>
      </div>
    </div>
  );
}
