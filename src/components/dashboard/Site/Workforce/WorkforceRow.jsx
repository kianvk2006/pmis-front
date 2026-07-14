import { Trash2 } from "lucide-react";

const workforceTypes = [
  {
    value: "worker",
    label: "کارگر ساده",
  },
  {
    value: "skilled_worker",
    label: "کارگر ماهر",
  },
  {
    value: "technician",
    label: "تکنسین",
  },
  {
    value: "operator",
    label: "اپراتور ماشین‌آلات",
  },
  {
    value: "engineer",
    label: "مهندس",
  },
  {
    value: "supervisor",
    label: "سرپرست",
  },
];

export default function WorkforceRow({ item, index, onChange, onRemove }) {
  const updateField = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
        <div className="xl:col-span-3">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            نوع نیروی انسانی
          </label>

          <select
            value={item.workforceType}
            onChange={(event) =>
              updateField("workforceType", event.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            <option value="">انتخاب نوع نیرو</option>

            {workforceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
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

            <option value="ACT-001">ریل‌گذاری</option>

            <option value="ACT-002">خاکبرداری</option>

            <option value="ACT-003">زیرسازی</option>

            <option value="ACT-004">بتن‌ریزی</option>
          </select>
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            تعداد نیرو
          </label>

          <input
            type="number"
            min="0"
            value={item.quantity}
            onChange={(event) => updateField("quantity", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            ساعت کار
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

        <div className="xl:col-span-1">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            اضافه‌کاری
          </label>

          <input
            type="number"
            min="0"
            step="0.5"
            value={item.overtimeHours}
            onChange={(event) =>
              updateField("overtimeHours", event.target.value)
            }
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

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-3">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            تعداد غایب
          </label>

          <input
            type="number"
            min="0"
            value={item.absentCount}
            onChange={(event) => updateField("absentCount", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div className="md:col-span-9">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            توضیحات
          </label>

          <input
            value={item.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="توضیحات وضعیت نیروها، تغییر شیفت یا موارد خاص..."
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>
      </div>
    </div>
  );
}
