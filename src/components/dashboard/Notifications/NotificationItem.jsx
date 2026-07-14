import {
  CheckCircle2,
  AlertTriangle,
  Bell,
} from "lucide-react";

const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Bell,
};

const colors = {
  success: "bg-green-100 text-green-600",
  warning: "bg-orange-100 text-orange-600",
  info: "bg-blue-100 text-blue-600",
};

export default function NotificationItem({
  title,
  description,
  time,
  type,
}) {
  const Icon = icons[type];

  return (
    <div className="flex gap-3 rounded-2xl border border-slate-100 p-4 hover:bg-slate-50 transition">

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[type]}`}
      >
        <Icon size={18} />
      </div>

      <div className="flex-1">

        <h4 className="font-semibold text-slate-700">
          {title}
        </h4>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

        <span className="mt-2 block text-xs text-slate-400">
          {time}
        </span>

      </div>

    </div>
  );
}