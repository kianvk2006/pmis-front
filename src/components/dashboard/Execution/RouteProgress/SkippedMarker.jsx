import { AlertTriangle } from "lucide-react";

export default function SkippedMarker({
  label = "تأخیر ثبت‌شده",
  reason = "بدون توضیحات",
}) {
  return (
    <div className="group relative flex flex-col items-center">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 shadow-lg">
        <AlertTriangle size={12} className="text-white" />
      </div>

      <div className="absolute bottom-10 z-50 hidden w-52 rounded-xl bg-slate-900 p-3 text-right text-xs text-white shadow-xl group-hover:block">
        <div className="font-bold">{label}</div>

        <div className="mt-2 text-slate-300">{reason}</div>
      </div>
    </div>
  );
}
