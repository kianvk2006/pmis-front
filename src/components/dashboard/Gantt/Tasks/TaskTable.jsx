import TaskRow from "./TaskRow";

export default function TaskTable({ activities }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="grid grid-cols-12 bg-slate-100 px-4 py-3 text-sm font-bold">
        <div className="col-span-2">کد</div>

        <div className="col-span-4">فعالیت</div>

        <div className="col-span-2 text-center">پیشرفت</div>

        <div className="col-span-2 text-center">شروع</div>

        <div className="col-span-2 text-center">پایان</div>
      </div>

      {activities.map((activity) => (
        <TaskRow key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
