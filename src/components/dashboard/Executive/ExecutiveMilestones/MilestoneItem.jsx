import { CheckCircle2, Circle, Clock3 } from "lucide-react";

const icons = {
  done: CheckCircle2,
  current: Clock3,
  upcoming: Circle,
};

const colors = {
  done: "text-green-600 bg-green-100",
  current: "text-orange-600 bg-orange-100",
  upcoming: "text-slate-400 bg-slate-100",
};

export default function MilestoneItem({ title, date, status }) {
  const Icon = icons[status];

  return (
    <div className="flex gap-4">
      <div
        className={`
        mt-1
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        ${colors[status]}
        `}
      >
        <Icon size={18} />
      </div>

      <div className="flex-1 border-r-2 border-slate-200 pr-5 pb-8">
        <h4 className="font-bold text-slate-800">{title}</h4>

        <p className="mt-2 text-sm text-slate-500">{date}</p>
      </div>
    </div>
  );
}
