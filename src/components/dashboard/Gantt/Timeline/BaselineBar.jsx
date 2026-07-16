export default function BaselineBar({ activity }) {
  return (
    <div
      className="
      absolute
      rounded
      bg-slate-400
      opacity-50
      "
      style={{
        left: activity.baselineLeft,

        top: activity.top + 4,

        width: activity.baselineWidth,

        height: 8,
      }}
    />
  );
}
