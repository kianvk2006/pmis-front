import { useEffect, useRef } from "react";

import { GanttProvider, useGanttContext } from "@/context/GanttContext";

import useScrollSync from "@/hooks/useScrollSync";
import useGantt from "@/hooks/useGantt";

import GanttHeader from "./Header";
import TaskTable from "./Tasks";
import Timeline from "./Timeline";

function GanttContent() {
  const { dashboard, activities, loading, zoom, setZoom, moveActivity } =
    useGantt();

  const { setMoveActivity } = useGanttContext();

  useEffect(() => {
    setMoveActivity(() => moveActivity);
  }, [moveActivity]);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useScrollSync(leftRef, rightRef);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <GanttHeader zoom={zoom} setZoom={setZoom} />

      <section className="grid grid-cols-12 gap-6">
        <div
          ref={leftRef}
          className="col-span-4 overflow-auto"
          style={{
            maxHeight: 650,
          }}
        >
          <TaskTable activities={activities} />
        </div>

        <div
          ref={rightRef}
          className="col-span-8 overflow-auto"
          style={{
            maxHeight: 650,
          }}
        >
          <Timeline
            months={dashboard.months}
            activities={activities}
            dependencies={dashboard.dependencies}
          />
        </div>
      </section>
    </div>
  );
}

export default function GanttDashboard() {
  return (
    <GanttProvider>
      <GanttContent />
    </GanttProvider>
  );
}
