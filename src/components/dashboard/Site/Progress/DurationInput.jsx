export default function DurationInput({ value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-600">
        مدت زمان اجرای عملیات
      </label>

      <div className="relative">
        <input
          type="number"
          min="0"
          step="0.5"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="مثلاً ۸"
          className="w-full rounded-xl border border-slate-200 bg-white p-3 pl-16 outline-none transition focus:border-orange-500"
        />

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
          ساعت
        </span>
      </div>
    </div>
  );
}
