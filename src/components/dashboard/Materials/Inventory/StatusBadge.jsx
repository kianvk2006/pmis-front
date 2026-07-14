const statusStyles = {
  "در انتظار تأمین": "bg-orange-100 text-orange-700",

  "درخواست تأمین": "bg-red-100 text-red-600",

  "مصرف ثبت‌شده": "bg-green-100 text-green-700",

  "بدون عملیات": "bg-slate-100 text-slate-600",
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] ?? "bg-slate-100 text-slate-600";

  return (
    <span
      className={`
        inline-flex
        whitespace-nowrap
        rounded-full
        px-4
        py-1
        text-sm
        font-semibold
        ${style}
      `}
    >
      {status || "نامشخص"}
    </span>
  );
}
