import { KPIGrid } from "./KPI";
import { TodayTasks } from "./TodayTasks";
import { DailyReport } from "./DailyReport";
import { ProgressForm } from "./Progress";
import { WorkforceForm } from "./Workforce";
import { EquipmentForm } from "./Equipment";
import { MaterialsForm } from "./Materials";
import { DelaysForm } from "./Delays";
import { PhotosForm } from "./Photos";
import { SubmitReport } from "./Submit";

import { EditReportLoader } from "./Reports";

import { useSiteReport } from "./store";

export default function SiteDashboard() {
  const { report } = useSiteReport();

  return (
    <>
      <EditReportLoader />

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">داشبورد کارگاه</h1>

            <p className="mt-2 text-slate-500">
              مرکز ثبت و مدیریت اطلاعات روزانه پروژه
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs text-slate-400">وضعیت گزارش</p>

            <p className="mt-1 font-bold text-orange-600">
              {report.status === "draft" ? "پیش‌نویس" : "ارسال‌شده"}
            </p>
          </div>
        </div>

        <KPIGrid />

        <TodayTasks />

        <DailyReport />

        <ProgressForm />

        <WorkforceForm />

        <EquipmentForm />

        <MaterialsForm />

        <DelaysForm />

        <PhotosForm />

        <SubmitReport />
      </div>
    </>
  );
}
