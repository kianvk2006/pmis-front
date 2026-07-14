const STATUS_CONFIG = {
  completed: {
    label: "انجام‌شده",
    className: "bg-green-100 text-green-700",
  },

  "in-progress": {
    label: "در حال اجرا",
    className: "bg-orange-100 text-orange-700",
  },

  delayed: {
    label: "دارای تأخیر",
    className: "bg-red-100 text-red-700",
  },

  "not-started": {
    label: "شروع نشده",
    className: "bg-slate-100 text-slate-600",
  },
};

export default function StatusBadge({ status }) {
  const normalizedStatus = String(status ?? "")
    .trim()
    .toLowerCase();

  const config = STATUS_CONFIG[normalizedStatus] ?? {
    label: status || "نامشخص",
    className: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`
        inline-flex
        whitespace-nowrap
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
}
