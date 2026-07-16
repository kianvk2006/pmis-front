import TimelineHeader from "./TimelineHeader";
import TimelineCanvas from "./TimelineCanvas";

export default function Timeline({
  months = [],
  activities = [],
  dependencies = [],
}) {
  return (
    <div
      className="
      overflow-auto
      rounded-2xl
      border
      border-slate-200
      bg-white
      "
    >
      <TimelineHeader months={months} />

      <TimelineCanvas
        months={months}
        activities={activities}
        dependencies={dependencies}
      />
    </div>
  );
}
