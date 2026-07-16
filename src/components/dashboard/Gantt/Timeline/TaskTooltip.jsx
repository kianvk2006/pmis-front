export default function TaskTooltip({ activity }) {
  return (
    <div
      className="
      absolute
      left-0
      top-full
      z-50
      mt-2
      hidden
      w-72
      rounded-xl
      bg-slate-900
      p-4
      text-white
      group-hover:block
      "
    >
      <h4 className="font-bold">{activity.name}</h4>

      <div className="mt-3 space-y-2 text-sm">
        <p>کد :{activity.code}</p>

        <p>پیشرفت :{activity.progress}%</p>

        <p>شروع :{activity.startDate}</p>

        <p>پایان :{activity.endDate}</p>
      </div>
    </div>
  );
}
