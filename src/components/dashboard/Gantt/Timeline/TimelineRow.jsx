import BaselineBar from "./BaselineBar";
import TimelineBar from "./TimelineBar";
import Milestone from "./Milestone";

export default function TimelineRow({ activity }) {
  const isMilestone = activity.type === "milestone" || activity.duration === 1;

  return (
    <div
      className="relative"
      style={{
        height: 52,
      }}
    >
      <BaselineBar activity={activity} />

      {isMilestone ? (
        <Milestone activity={activity} />
      ) : (
        <TimelineBar activity={activity} />
      )}
    </div>
  );
}
