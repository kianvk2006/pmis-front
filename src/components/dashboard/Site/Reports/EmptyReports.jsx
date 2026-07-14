import { ClipboardList } from "lucide-react";

export default function EmptyReports() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <ClipboardList size={26} />
      </div>

      <p className="mt-4 font-bold text-slate-700">هنوز گزارشی ثبت نشده است</p>

      <p className="mt-2 text-sm text-slate-500">
        پس از ارسال نهایی گزارش‌های کارگاه، گزارش‌ها در این بخش نمایش داده
        می‌شوند.
      </p>
    </div>
  );
}
