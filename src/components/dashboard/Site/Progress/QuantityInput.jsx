export default function QuantityInput({ value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-600">
        مقدار اجرای واقعی
      </label>

      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="مقدار عملیات انجام‌شده"
        className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
      />

      <p className="mt-2 text-xs text-slate-400">
        واحد مقدار اجرا بعداً براساس فعالیت انتخاب‌شده از Backend دریافت می‌شود.
      </p>
    </div>
  );
}
