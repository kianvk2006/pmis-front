import { useEffect, useRef } from "react";

import { useGanttContext } from "@/context/GanttContext";

import TimelineGrid from "./TimelineGrid";
import TimelineToday from "./TimelineToday";
import TimelineBody from "./TimelineBody";
import DependencyLayer from "./Dependencies";
import ProgressLine from "./ProgressLine";
import DropLayer from "./DropLayer";

export default function TimelineCanvas({ months, activities, dependencies }) {
  const ref = useRef(null);

  const { setTimelineRef } = useGanttContext();

  useEffect(() => {
    setTimelineRef(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        minHeight: activities.length * 52,
      }}
    >
      <TimelineGrid months={months} rowCount={activities.length} />

      <DependencyLayer dependencies={dependencies} />

      <ProgressLine activities={activities} />

      <TimelineToday />

      <DropLayer />

      <TimelineBody activities={activities} />
    </div>
  );
}
