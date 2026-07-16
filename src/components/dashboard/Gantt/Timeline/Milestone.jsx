export default function Milestone({ activity }) {
  return (
    <div
      className="
      absolute
      flex
      items-center
      justify-center
      "
      style={{
        left: activity.left - 8,

        top: activity.top + 2,

        width: 16,

        height: 16,
      }}
    >
      <div
        className={`
        h-4
        w-4
        rotate-45
        rounded-[2px]
        ${activity.critical ? "bg-red-600" : "bg-blue-600"}
        `}
      />
    </div>
  );
}
