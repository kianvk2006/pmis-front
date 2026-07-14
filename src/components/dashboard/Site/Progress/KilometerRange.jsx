export default function KilometerRange({ fromKm, toKm, onChange }) {
  return (
    <div>
      <div className="mb-3">
        <p className="font-semibold text-slate-700">محدوده اجرای عملیات</p>

        <p className="mt-1 text-sm text-slate-500">
          بازه واقعی مسیر که عملیات در آن انجام شده است.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            از کیلومتر
          </label>

          <input
            type="text"
            value={fromKm}
            onChange={(event) => onChange("fromKm", event.target.value)}
            placeholder="مثلاً 328+200"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            تا کیلومتر
          </label>

          <input
            type="text"
            value={toKm}
            onChange={(event) => onChange("toKm", event.target.value)}
            placeholder="مثلاً 329+000"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>
      </div>
    </div>
  );
}
