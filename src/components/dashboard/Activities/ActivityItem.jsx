import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Circle,
} from "lucide-react";

const icons = {
  completed: CheckCircle2,
  progress: Clock3,
  pending: Circle,
  warning: AlertTriangle,
};

const colors = {
  completed: "text-green-600 bg-green-100",
  progress: "text-blue-600 bg-blue-100",
  pending: "text-slate-500 bg-slate-100",
  warning: "text-orange-600 bg-orange-100",
};

export default function ActivityItem({
  title,
  user,
  time,
  status,
}) {
  const Icon = icons[status];

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 hover:bg-slate-50 transition">

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors[status]}`}
      >
        <Icon size={20} />
      </div>

      <div className="flex-1">

        <h4 className="font-semibold text-slate-700">
          {title}
        </h4>

        <p className="text-sm text-slate-400 mt-1">
          {user}
        </p>

      </div>

      <span className="text-sm text-slate-500">
        {time}
      </span>

    </div>
  );
}