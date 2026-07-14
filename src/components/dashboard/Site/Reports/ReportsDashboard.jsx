import ReportsList from "./ReportsList";

export default function ReportsDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">گزارش‌های کارگاه</h1>

        <p className="mt-2 text-slate-500">
          مدیریت، مشاهده و ویرایش گزارش‌های ثبت‌شده کارگاه
        </p>
      </div>

      <ReportsList />
    </div>
  );
}
