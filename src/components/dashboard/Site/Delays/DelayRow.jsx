import { Trash2 } from "lucide-react";

const delayTypeOptions = [
  {
    value: "weather",
    label: "شرایط جوی",
  },
  {
    value: "material",
    label: "کمبود مصالح",
  },
  {
    value: "equipment",
    label: "خرابی ماشین‌آلات",
  },
  {
    value: "workforce",
    label: "کمبود نیروی انسانی",
  },
  {
    value: "technical",
    label: "مشکل فنی",
  },
  {
    value: "design",
    label: "نقشه و طراحی",
  },
  {
    value: "employer",
    label: "کارفرما",
  },
  {
    value: "contractor",
    label: "پیمانکار",
  },
  {
    value: "safety",
    label: "ایمنی",
  },
  {
    value: "other",
    label: "سایر",
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

const responsibilityOptions = [
  {
    value: "employer",
    label: "کارفرما",
  },
  {
    value: "contractor",
    label: "پیمانکار",
  },
  {
    value: "consultant",
    label: "مشاور",
  },
  {
    value: "supplier",
    label: "تأمین‌کننده",
  },
  {
    value: "external",
    label: "عامل بیرونی",
  },
  {
    value: "unknown",
    label: "نامشخص",
  },
];

const severityOptions = [
  {
    value: "low",
    label: "کم",
  },
  {
    value: "medium",
    label: "متوسط",
  },
  {
    value: "high",
    label: "زیاد",
  },
  {
    value: "critical",
    label: "بحرانی",
  },
];

const statusOptions = [
  {
    value: "open",
    label: "باز",
  },
  {
    value: "in_progress",
    label: "در حال پیگیری",
  },
  {
    value: "resolved",
    label: "رفع‌شده",
  },
];

export default function DelayRow({ item, index, onChange, onRemove }) {
  const updateField = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
        <div className="xl:col-span-3">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            نوع تأخیر
          </label>

          <select
            value={item.delayType}
            onChange={(event) => updateField("delayType", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            <option value="">انتخاب نوع تأخیر</option>

            {delayTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-3">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            فعالیت تحت تأثیر
          </label>

          <select
            value={item.activityId}
            onChange={(event) => updateField("activityId", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            <option value="">انتخاب فعالیت</option>

            {activityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            مدت تأخیر
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.5"
              value={item.delayHours}
              onChange={(event) =>
                updateField("delayHours", event.target.value)
              }
              placeholder="0"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 pl-14 outline-none transition focus:border-orange-500"
            />

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              ساعت
            </span>
          </div>
        </div>

        <div className="xl:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            شدت اثر
          </label>

          <select
            value={item.severity}
            onChange={(event) => updateField("severity", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            {severityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-1">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            وضعیت
          </label>

          <select
            value={item.status}
            onChange={(event) => updateField("status", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
            مسئول تأخیر
          </label>

          <select
            value={item.responsibility}
            onChange={(event) =>
              updateField("responsibility", event.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            {responsibilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="xl:col-span-4">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            علت تأخیر
          </label>

          <input
            type="text"
            value={item.reason}
            onChange={(event) => updateField("reason", event.target.value)}
            placeholder="شرح علت اصلی ایجاد تأخیر..."
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div className="xl:col-span-5">
          <label className="mb-2 block text-sm font-medium text-slate-600">
            اقدام اصلاحی / برنامه رفع تأخیر
          </label>

          <input
            type="text"
            value={item.correctiveAction}
            onChange={(event) =>
              updateField("correctiveAction", event.target.value)
            }
            placeholder="اقدام انجام‌شده یا برنامه پیشنهادی برای رفع تأخیر..."
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>
      </div>
    </div>
  );
}
