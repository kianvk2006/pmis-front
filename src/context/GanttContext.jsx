import { createContext, useContext, useState } from "react";

const GanttContext = createContext(null);

export function GanttProvider({ children }) {
  const [draggingActivity, setDraggingActivity] = useState(null);

  const [timelineRef, setTimelineRef] = useState(null);

  const [moveActivity, setMoveActivity] = useState(null);

  return (
    <GanttContext.Provider
      value={{
        draggingActivity,
        setDraggingActivity,

        timelineRef,
        setTimelineRef,

        moveActivity,
        setMoveActivity,
      }}
    >
      {children}
    </GanttContext.Provider>
  );
}

export function useGanttContext() {
  return useContext(GanttContext);
}
