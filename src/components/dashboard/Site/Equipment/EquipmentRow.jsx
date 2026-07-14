import { Trash2 } from "lucide-react";

const equipmentOptions = [
  {
    value: "EQ-001",
    label: "بیل مکانیکی CAT 320",
  },
  {
    value: "EQ-002",
    label: "لودر CAT 950",
  },
  {
    value: "EQ-003",
    label: "بولدوزر D8",
  },
  {
    value: "EQ-004",
    label: "غلطک HAMM",
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

const statusOptions = [
  {
    value: "active",
    label: "فعال",
  },
  {
    value: "stopped",
    label: "متوقف",
  },
  {
    value: "maintenance",
    label: "در حال تعمیر",
  },
  {
    value: "broken",
    label: "خراب",
  },
];

const failureOptions = [
  {
    value: "mechanical",
    label: "مکانیکی",
  },
  {
    value: "electrical",
    label: "برقی",
  },
  {
    value: "hydraulic",
    label: "هیدرولیک",
  },
  {
    value: "engine",
    label: "موتور",
  },
  {
    value: "other",
    label: "سایر",
  },
];

export default function EquipmentRow({ item, index, onChange, onRemove }) {
  const updateField = (field, value) => {
    onChange(index, field, value);
  };

  const hasFailure = item.status === "broken" || item.status === "maintenance";

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
        <div className="xl:col-span-3">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            ماشین‌آلات
          </label>

          <select
            value={item.equipmentId}
            onChange={(event) => updateField("equipmentId", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            <option value="">انتخاب ماشین</option>

            {equipmentOptions.map((equipment) => (
              <option key={equipment.value} value={equipment.value}>
                {equipment.label}
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
            <option value="">بدون فعالیت مرتبط</option>

            {activityOptions.map((activity) => (
              <option key={activity.value} value={activity.value}>
                {activity.label}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            ساعت کارکرد
          </label>

          <input
            type="number"
            min="0"
            step="0.5"
            value={item.workHours}
            onChange={(event) => updateField("workHours", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            ساعت توقف
          </label>

          <input
            type="number"
            min="0"
            step="0.5"
            value={item.stopHours}
            onChange={(event) => updateField("stopHours", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div className="xl:col-span-1">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            سوخت
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={item.fuel}
            onChange={(event) => updateField("fuel", event.target.value)}
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

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
        <div className="xl:col-span-3">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            وضعیت ماشین
          </label>

          <select
            value={item.status}
            onChange={(event) => updateField("status", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {hasFailure && (
          <div className="xl:col-span-3">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              نوع خرابی
            </label>

            <select
              value={item.failureType}
              onChange={(event) =>
                updateField("failureType", event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
            >
              <option value="">انتخاب نوع خرابی</option>

              {failureOptions.map((failure) => (
                <option key={failure.value} value={failure.value}>
                  {failure.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={hasFailure ? "xl:col-span-6" : "xl:col-span-9"}>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            توضیحات
          </label>

          <input
            value={item.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="شرح کارکرد، توقف، خرابی یا وضعیت ماشین..."
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>
      </div>
    </div>
  );
}
