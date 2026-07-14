import { CalendarDays, Clock3, Edit3, FileText, HardHat } from "lucide-react";

const shiftLabels = {
  day: "روز",
  night: "شب",
  morning: "صبح",
  evening: "عصر",
};

export default function ReportCard({ report, onEdit }) {
  const progressCount = report.progressItems?.length ?? 0;

  const workforceCount = report.workforceItems?.length ?? 0;

  const equipmentCount = report.equipmentItems?.length ?? 0;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-orange-200">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <FileText size={21} />
            </div>

            <div>
              <p className="font-bold text-slate-800">گزارش روزانه کارگاه</p>

              <p className="mt-1 break-all text-xs text-slate-400">
                {report.id}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
              <CalendarDays size={16} />
              {report.generalInfo?.reportDate || "بدون تاریخ"}
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
              <Clock3 size={16} />

              {shiftLabels[report.generalInfo?.shift] ??
                report.generalInfo?.shift ??
                "-"}
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
              <HardHat size={16} />

              {report.generalInfo?.supervisor || "سرپرست ثبت نشده"}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
              {progressCount} پیشرفت
            </span>

            <span className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
              {workforceCount} نیروی انسانی
            </span>

            <span className="rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-600">
              {equipmentCount} تجهیز
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onEdit(report)}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          <Edit3 size={18} />
          ویرایش گزارش
        </button>
      </div>
    </article>
  );
}
