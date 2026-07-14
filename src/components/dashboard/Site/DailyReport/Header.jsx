import { ClipboardList } from "lucide-react";

export default function Header({ status = "draft" }) {
  const statusLabel =
    status === "submitted"
      ? "ارسال‌شده"
      : status === "approved"
        ? "تأییدشده"
        : "پیش‌نویس";

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
          <ClipboardList size={26} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            گزارش روزانه کارگاه
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            ثبت اطلاعات پایه و شرایط روزانه پروژه
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
        {statusLabel}
      </div>
    </div>
  );
}
