import getTaskColor from "./getTaskColor";
import TaskTooltip from "./TaskTooltip";

import useActivityDrag from "@/hooks/useActivityDrag";

export default function TimelineBar({ activity }) {
  const colors = getTaskColor(activity);

  const { draggingActivity, onDragStart, onDragEnd } = useActivityDrag();

  const isDragging = draggingActivity?.id === activity.id;

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, activity)}
      onDragEnd={onDragEnd}
      className={`
        group
        absolute
        cursor-move
        transition-all
        duration-200
        ${isDragging ? "scale-105 opacity-70 z-50" : "hover:scale-[1.02]"}
      `}
      style={{
        left: activity.left,
        top: activity.top,
      }}
    >
      <div
        className={`
          relative
          overflow-hidden
          rounded-md
          shadow-md
          ${colors.background}
        `}
        style={{
          width: activity.width,
          height: activity.height,
        }}
      >
        {/* Progress */}
        <div
          className={colors.progress}
          style={{
            width: `${activity.progress}%`,
            height: "100%",
          }}
        />

        {/* Activity Code */}
        <span
          className="
            absolute
            inset-0
            flex
            items-center
            px-2
            text-xs
            font-semibold
            text-white
            select-none
            pointer-events-none
          "
        >
          {activity.code}
        </span>
      </div>

      <TaskTooltip activity={activity} />
    </div>
  );
}
