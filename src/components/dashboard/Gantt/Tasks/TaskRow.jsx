export default function TaskRow({ activity }) {
  return (
    <div className="grid grid-cols-12 items-center border-b border-slate-100 px-4 py-3 hover:bg-slate-50">
      <div className="col-span-2 font-medium">{activity.code}</div>

      <div className="col-span-4">{activity.name}</div>

      <div className="col-span-2 text-center">{activity.progress}%</div>

      <div className="col-span-2 text-center">{activity.startDate}</div>

      <div className="col-span-2 text-center">{activity.endDate}</div>
    </div>
  );
}
