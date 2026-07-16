import { calculateTodayPosition } from "@/services/gantt/ganttTodayService";

export default function TimelineToday() {
  const left = calculateTodayPosition("2026-03-01");

  return (
    <div
      className="absolute top-0 bottom-0 z-30"
      style={{
        left,
      }}
    >
      <div className="h-full w-[2px] bg-red-500" />

      <div
        className="
        absolute
        -top-2
        left-1/2
        -translate-x-1/2
        rounded-full
        bg-red-500
        px-2
        py-1
        text-[10px]
        font-bold
        text-white
        "
      >
        Today
      </div>
    </div>
  );
}
