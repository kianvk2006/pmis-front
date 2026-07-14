export default function GenelarInfo({ generalInfo, onChange }) {
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-800">
          اطلاعات عمومی گزارش
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          پروژه، تاریخ گزارش و شیفت کاری را مشخص کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            پروژه
          </label>

          <select
            value={generalInfo.projectId ?? ""}
            onChange={(event) => onChange("projectId", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            <option value="">انتخاب پروژه</option>

            <option value="PRJ-001">پروژه قطار برقی گلبهار مشهد</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            تاریخ گزارش
          </label>

          <input
            type="date"
            value={generalInfo.reportDate ?? ""}
            onChange={(event) => onChange("reportDate", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            شیفت کاری
          </label>

          <select
            value={generalInfo.shift ?? "day"}
            onChange={(event) => onChange("shift", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none transition focus:border-orange-500"
          >
            <option value="day">روز</option>
            <option value="night">شب</option>
            <option value="full_day">شبانه‌روزی</option>
          </select>
        </div>
      </div>
    </div>
  );
}
