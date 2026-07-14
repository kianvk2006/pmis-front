export default function EquipmentSummary({ items }) {
  const validItems = items.filter((item) => item.equipmentId);

  const totalEquipment = validItems.length;

  const activeEquipment = validItems.filter(
    (item) => item.status === "active",
  ).length;

  const unavailableEquipment = validItems.filter(
    (item) => item.status === "broken" || item.status === "maintenance",
  ).length;

  const totalWorkHours = validItems.reduce(
    (sum, item) => sum + (Number(item.workHours) || 0),
    0,
  );

  const totalStopHours = validItems.reduce(
    (sum, item) => sum + (Number(item.stopHours) || 0),
    0,
  );

  const totalFuel = validItems.reduce(
    (sum, item) => sum + (Number(item.fuel) || 0),
    0,
  );

  const utilizationHours = totalWorkHours + totalStopHours;

  const utilizationRate =
    utilizationHours > 0 ? (totalWorkHours / utilizationHours) * 100 : 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-blue-50 p-5">
        <p className="text-sm text-slate-500">ماشین‌آلات ثبت‌شده</p>

        <p className="mt-2 text-3xl font-black text-blue-600">
          {totalEquipment}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {activeEquipment} دستگاه فعال
        </p>
      </div>

      <div className="rounded-2xl bg-green-50 p-5">
        <p className="text-sm text-slate-500">مجموع ساعت کارکرد</p>

        <p className="mt-2 text-3xl font-black text-green-600">
          {totalWorkHours.toFixed(1)}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          بهره‌برداری {utilizationRate.toFixed(1)}٪
        </p>
      </div>

      <div className="rounded-2xl bg-red-50 p-5">
        <p className="text-sm text-slate-500">مجموع ساعت توقف</p>

        <p className="mt-2 text-3xl font-black text-red-600">
          {totalStopHours.toFixed(1)}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {unavailableEquipment} دستگاه خراب یا در تعمیر
        </p>
      </div>

      <div className="rounded-2xl bg-orange-50 p-5">
        <p className="text-sm text-slate-500">مصرف سوخت</p>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-3xl font-black text-orange-600">
            {totalFuel.toFixed(1)}
          </span>

          <span className="pb-1 text-sm text-slate-500">لیتر</span>
        </div>
      </div>
    </div>
  );
}
