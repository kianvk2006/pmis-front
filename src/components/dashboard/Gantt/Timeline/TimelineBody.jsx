import TimelineRow from "./TimelineRow";

export default function TimelineBody({ activities = [] }) {
  return (
    <div
      style={{
        position: "relative",
        height: activities.length * 52,
      }}
    >
      {activities.map((activity) => (
        <TimelineRow key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
