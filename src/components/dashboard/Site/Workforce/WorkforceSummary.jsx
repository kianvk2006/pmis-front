export default function WorkforceSummary({ items }) {
  const validItems = items.filter((item) => item.workforceType);

  const totalPersonnel = validItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );

  /*
    Man-Hour

    تعداد نیرو × ساعت کار هر نیرو
  */

  const totalManHours = validItems.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;

    const workHours = Number(item.workHours) || 0;

    return sum + quantity * workHours;
  }, 0);

  const totalOvertimeManHours = validItems.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;

    const overtimeHours = Number(item.overtimeHours) || 0;

    return sum + quantity * overtimeHours;
  }, 0);

  const totalAbsent = validItems.reduce(
    (sum, item) => sum + (Number(item.absentCount) || 0),
    0,
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-blue-50 p-5">
        <p className="text-sm text-slate-500">نیروی حاضر ثبت‌شده</p>

        <p className="mt-2 text-3xl font-black text-blue-600">
          {totalPersonnel}
        </p>
      </div>

      <div className="rounded-2xl bg-green-50 p-5">
        <p className="text-sm text-slate-500">مجموع نفر-ساعت</p>

        <p className="mt-2 text-3xl font-black text-green-600">
          {totalManHours.toFixed(1)}
        </p>
      </div>

      <div className="rounded-2xl bg-orange-50 p-5">
        <p className="text-sm text-slate-500">نفر-ساعت اضافه‌کاری</p>

        <p className="mt-2 text-3xl font-black text-orange-600">
          {totalOvertimeManHours.toFixed(1)}
        </p>
      </div>

      <div className="rounded-2xl bg-red-50 p-5">
        <p className="text-sm text-slate-500">تعداد غایب</p>

        <p className="mt-2 text-3xl font-black text-red-600">{totalAbsent}</p>
      </div>
    </div>
  );
}
