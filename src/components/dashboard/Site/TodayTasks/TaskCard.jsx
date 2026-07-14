import StatusBadge from "./statusbadge";
import TaskActions from "./taskactions";

export default function TaskCard({ task, onRegisterProgress, onDetails }) {
  const progress = Number(task.progress) || 0;

  return (
    <article className="rounded-2xl border border-slate-300 bg-white p-6">
      <div className="flex items-start justify-between gap-6">
        <StatusBadge status={task.status} />

        <div className="text-right">
          <h3 className="text-xl font-black text-slate-900">{task.title}</h3>

          <p className="mt-2 text-slate-500">{task.km}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-medium text-slate-700">{progress}%</span>

          <span className="font-medium text-slate-700">پیشرفت</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-300"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <TaskActions
          task={task}
          onRegisterProgress={onRegisterProgress}
          onDetails={onDetails}
        />
      </div>
    </article>
  );
}
