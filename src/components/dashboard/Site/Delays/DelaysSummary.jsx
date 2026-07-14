export default function DelaysSummary({ items }) {
  const validItems = items.filter((item) => item.delayType);

  const totalDelays = validItems.length;

  const totalDelayHours = validItems.reduce(
    (sum, item) => sum + (Number(item.delayHours) || 0),
    0,
  );

  const openDelays = validItems.filter((item) => item.status === "open").length;

  const criticalDelays = validItems.filter(
    (item) => item.severity === "critical",
  ).length;

  const resolvedDelays = validItems.filter(
    (item) => item.status === "resolved",
  ).length;

  const resolutionRate =
    totalDelays > 0 ? (resolvedDelays / totalDelays) * 100 : 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-blue-50 p-5">
        <p className="text-sm text-slate-500">تأخیرهای ثبت‌شده</p>

        <p className="mt-2 text-3xl font-black text-blue-600">{totalDelays}</p>

        <p className="mt-2 text-xs text-slate-400">{openDelays} مورد باز</p>
      </div>

      <div className="rounded-2xl bg-orange-50 p-5">
        <p className="text-sm text-slate-500">مجموع زمان تأخیر</p>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-3xl font-black text-orange-600">
            {totalDelayHours.toFixed(1)}
          </span>

          <span className="pb-1 text-sm text-slate-500">ساعت</span>
        </div>
      </div>

      <div className="rounded-2xl bg-red-50 p-5">
        <p className="text-sm text-slate-500">تأخیرهای بحرانی</p>

        <p className="mt-2 text-3xl font-black text-red-600">
          {criticalDelays}
        </p>

        <p className="mt-2 text-xs text-slate-400">نیازمند پیگیری فوری</p>
      </div>

      <div className="rounded-2xl bg-green-50 p-5">
        <p className="text-sm text-slate-500">نرخ رفع تأخیر</p>

        <p className="mt-2 text-3xl font-black text-green-600">
          {resolutionRate.toFixed(1)}%
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {resolvedDelays} مورد رفع‌شده
        </p>
      </div>
    </div>
  );
}
