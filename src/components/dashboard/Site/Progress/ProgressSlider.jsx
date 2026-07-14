export default function ProgressSlider({ value, onChange }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-600">
          درصد پیشرفت فعالیت
        </label>

        <span className="rounded-lg bg-orange-50 px-3 py-1 text-sm font-black text-orange-600">
          {value}%
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full cursor-pointer accent-orange-500"
      />

      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>۰٪</span>
        <span>۵۰٪</span>
        <span>۱۰۰٪</span>
      </div>
    </div>
  );
}
