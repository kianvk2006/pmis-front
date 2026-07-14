import { UserRoundCheck } from "lucide-react";

export default function SupervisorSection({ generalInfo, onChange }) {
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-800">مسئول گزارش</h3>

        <p className="mt-1 text-sm text-slate-500">
          مسئول ثبت و تأیید اولیه اطلاعات روزانه کارگاه را مشخص کنید.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-600">
          سرپرست کارگاه
        </label>

        <div className="relative">
          <input
            type="text"
            value={generalInfo.supervisor ?? ""}
            onChange={(event) => onChange("supervisor", event.target.value)}
            placeholder="نام سرپرست کارگاه"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 pr-11 outline-none transition focus:border-orange-500"
          />

          <UserRoundCheck
            size={19}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>
    </div>
  );
}
