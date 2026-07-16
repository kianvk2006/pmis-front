import { useGanttContext } from "@/context/GanttContext";

export default function useActivityDrag() {
  const { draggingActivity, setDraggingActivity } = useGanttContext();

  function onDragStart(event, activity) {
    event.dataTransfer.effectAllowed = "move";

    setDraggingActivity(activity);
  }

  function onDragEnd() {
    setDraggingActivity(null);
  }

  return {
    draggingActivity,

    onDragStart,

    onDragEnd,
  };
}
