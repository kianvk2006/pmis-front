import { useCallback } from "react";

import { useGanttContext } from "@/context/GanttContext";

export default function useTimelineDrop() {
  const {
    draggingActivity,

    setDraggingActivity,

    timelineRef,

    moveActivity,
  } = useGanttContext();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!draggingActivity || !timelineRef) {
        return;
      }

      const rect = timelineRef.getBoundingClientRect();

      const left = event.clientX - rect.left;

      moveActivity?.(
        draggingActivity.id,

        draggingActivity.startDate,

        draggingActivity.endDate,

        left,
      );

      setDraggingActivity(null);
    },
    [draggingActivity, timelineRef, moveActivity],
  );

  return {
    onDragOver,

    onDrop,
  };
}
