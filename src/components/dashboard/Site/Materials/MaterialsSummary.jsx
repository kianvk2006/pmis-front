export default function MaterialsSummary({
  consumptionItems = [],
  requestItems = [],
}) {
  const validConsumptions = consumptionItems.filter((item) => item?.materialId);

  const validRequests = requestItems.filter((item) => item?.materialId);

  const criticalRequests = validRequests.filter(
    (item) => item.priority === "critical",
  ).length;

  const importantRequests = validRequests.filter(
    (item) => item.priority === "important",
  ).length;

  const activitiesWithConsumption = new Set(
    validConsumptions
      .filter((item) => item.activityId)
      .map((item) => item.activityId),
  ).size;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-blue-50 p-5">
        <p className="text-sm text-slate-500">رکورد مصرف مصالح</p>

        <p className="mt-2 text-3xl font-black text-blue-600">
          {validConsumptions.length}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          مرتبط با {activitiesWithConsumption} فعالیت
        </p>
      </div>

      <div className="rounded-2xl bg-orange-50 p-5">
        <p className="text-sm text-slate-500">درخواست‌های تأمین</p>

        <p className="mt-2 text-3xl font-black text-orange-600">
          {validRequests.length}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {importantRequests} درخواست مهم
        </p>
      </div>

      <div className="rounded-2xl bg-red-50 p-5">
        <p className="text-sm text-slate-500">درخواست‌های بحرانی</p>

        <p className="mt-2 text-3xl font-black text-red-600">
          {criticalRequests}
        </p>

        <p className="mt-2 text-xs text-slate-400">نیازمند پیگیری فوری</p>
      </div>

      <div className="rounded-2xl bg-green-50 p-5">
        <p className="text-sm text-slate-500">فعالیت دارای مصرف</p>

        <p className="mt-2 text-3xl font-black text-green-600">
          {activitiesWithConsumption}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          قابل استفاده در تحلیل مصرف واقعی
        </p>
      </div>
    </div>
  );
}
