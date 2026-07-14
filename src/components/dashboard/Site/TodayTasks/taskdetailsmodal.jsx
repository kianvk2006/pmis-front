import { X, MapPin, Activity, Gauge } from "lucide-react";

const statusLabels = {
  not_started: "شروع نشده",
  in_progress: "در حال اجرا",
  completed: "تکمیل شده",
};

export default function TaskDetailsModal({ task, onClose }) {
  if (!task) {
    return null;
  }

  const progress = Number(task.progress) || 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-orange-600">
              جزئیات فعالیت
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
              {task.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={17} />
              موقعیت اجرایی
            </div>

            <p className="mt-2 font-bold text-slate-800">{task.km || "-"}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Activity size={17} />
              وضعیت فعالیت
            </div>

            <p className="mt-2 font-bold text-slate-800">
              {statusLabels[task.status] || "نامشخص"}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Gauge size={17} />
              پیشرفت فعالیت
            </div>

            <span className="font-black text-orange-600">{progress}%</span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-orange-500 transition-all"
              style={{
                width: `${Math.min(100, Math.max(0, progress))}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-7 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
