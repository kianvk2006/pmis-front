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

const priorityOptions = [
  {
    value: "normal",
    label: "عادی",
  },
  {
    value: "important",
    label: "مهم",
  },
  {
    value: "critical",
    label: "بحرانی",
  },
];

export default function RequestRow({ item, index, onChange, onRemove }) {
  const updateField = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
        <div className="xl:col-span-3">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            مصالح درخواستی
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

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            مقدار موردنیاز
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

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            تاریخ نیاز
          </label>

          <input
            type="date"
            value={item.requiredDate}
            onChange={(event) =>
              updateField("requiredDate", event.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            اولویت
          </label>

          <select
            value={item.priority}
            onChange={(event) => updateField("priority", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            {priorityOptions.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            محل تحویل
          </label>

          <input
            type="text"
            value={item.deliveryLocation}
            onChange={(event) =>
              updateField("deliveryLocation", event.target.value)
            }
            placeholder="انبار یا جبهه کاری"
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

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-600">
          علت درخواست / توضیحات
        </label>

        <textarea
          rows={3}
          value={item.reason}
          onChange={(event) => updateField("reason", event.target.value)}
          placeholder="علت نیاز به مصالح، فعالیت مرتبط یا توضیحات تکمیلی..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
        />
      </div>
    </div>
  );
}
