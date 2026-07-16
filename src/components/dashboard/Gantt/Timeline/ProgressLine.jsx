export default function ProgressLine({ activities = [] }) {
  if (!activities.length) {
    return null;
  }

  const points = activities
    .map((activity) => {
      const x = activity.left + (activity.width * activity.progress) / 100;

      const y = activity.top + activity.height / 2;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      className="
      absolute
      inset-0
      pointer-events-none
      "
    >
      <polyline points={points} fill="none" stroke="#22C55E" strokeWidth="3" />
    </svg>
  );
}
