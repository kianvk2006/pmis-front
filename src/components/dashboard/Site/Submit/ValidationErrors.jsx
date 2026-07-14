import { AlertTriangle, X } from "lucide-react";

export default function ValidationErrors({ errors = [], onClose }) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <AlertTriangle size={20} />
          </div>

          <div>
            <h3 className="font-bold text-red-700">گزارش آماده ارسال نیست</h3>

            <p className="mt-1 text-sm text-red-600">
              موارد زیر را اصلاح کنید و دوباره گزارش را بررسی کنید.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-100"
        >
          <X size={18} />
        </button>
      </div>

      <ul className="mt-5 space-y-2 pr-5 text-sm text-red-700">
        {errors.map((error, index) => (
          <li key={`${error}-${index}`} className="list-disc">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}
