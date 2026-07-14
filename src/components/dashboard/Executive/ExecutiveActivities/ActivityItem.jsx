import {
  CircleCheck,
  Clock3,
  FileText,
  AlertTriangle,
} from "lucide-react";

const icons = {
  success: CircleCheck,
  warning: AlertTriangle,
  document: FileText,
  pending: Clock3,
};

const colors = {
  success: "bg-green-100 text-green-600",
  warning: "bg-red-100 text-red-600",
  document: "bg-blue-100 text-blue-600",
  pending: "bg-orange-100 text-orange-600",
};

export default function ActivityItem({
  title,
  description,
  time,
  type,
}) {
  const Icon = icons[type];

  return (
    <div className="flex gap-4">

      <div
        className={`
        mt-1
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        ${colors[type]}
        `}
      >
        <Icon size={20} />
      </div>

      <div className="flex-1">

        <div className="flex items-center justify-between">

          <h4 className="font-semibold text-slate-800">
            {title}
          </h4>

          <span className="text-xs text-slate-400">
            {time}
          </span>

        </div>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}