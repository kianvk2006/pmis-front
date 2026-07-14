import { ClipboardPenLine, Eye } from "lucide-react";

export default function TaskActions({ task, onRegisterProgress, onDetails }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => onRegisterProgress(task)}
        className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
      >
        <ClipboardPenLine size={18} />
        ثبت پیشرفت
      </button>

      <button
        type="button"
        onClick={() => onDetails?.(task)}
        className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <Eye size={18} />
        جزئیات
      </button>
    </div>
  );
}
