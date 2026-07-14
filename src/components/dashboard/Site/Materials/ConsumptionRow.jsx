import { Trash2 } from "lucide-react";

const materialOptions = [
  {
    value: "MAT-001",
    label: "سیمان",
  },
  {
    value: "MAT-002",
    label: "آرماتور",
  },
  {
    value: "MAT-003",
    label: "بتن آماده",
  },
  {
    value: "MAT-004",
    label: "شن و ماسه",
  },
  {
    value: "MAT-005",
    label: "ریل",
  },
];

const activityOptions = [
  {
    value: "ACT-001",
    label: "ریل‌گذاری",
  },
  {
    value: "ACT-002",
    label: "خاکبرداری",
  },
  {
    value: "ACT-003",
    label: "زیرسازی",
  },
  {
    value: "ACT-004",
    label: "بتن‌ریزی",
  },
];

export default function ConsumptionRow({ item, index, onChange, onRemove }) {
  const updateField = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
        <div className="xl:col-span-3">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            مصالح مصرف‌شده
          </label>

          <select
            value={item.materialId}
            onChange={(event) => updateField("materialId", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            <option value="">انتخاب مصالح</option>

            {materialOptions.map((material) => (
              <option key={material.value} value={material.value}>
                {material.label}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-3">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            فعالیت مرتبط
          </label>

          <select
            value={item.activityId}
            onChange={(event) => updateField("activityId", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            <option value="">انتخاب فعالیت</option>

            {activityOptions.map((activity) => (
              <option key={activity.value} value={activity.value}>
                {activity.label}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            مقدار مصرف
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={item.quantity}
            onChange={(event) => updateField("quantity", event.target.value)}
            placeholder="مقدار"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div className="xl:col-span-1">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            واحد
          </label>

          <div className="flex h-[50px] items-center justify-center rounded-xl border border-slate-200 bg-white px-2 text-sm font-semibold text-slate-600">
            {item.unit || "-"}
          </div>
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            محل مصرف
          </label>

          <input
            type="text"
            value={item.location}
            onChange={(event) => updateField("location", event.target.value)}
            placeholder="مثلاً KM 328+200"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div className="flex items-end xl:col-span-1">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex h-[50px] w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition hover:bg-red-100"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
