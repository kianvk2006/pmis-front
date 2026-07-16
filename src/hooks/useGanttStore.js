import { useState } from "react";

export default function useGanttStore(initialActivities = []) {
  const [activities, setActivities] = useState(initialActivities);

  function moveActivity(activityId, startDate, endDate, left) {
    setActivities((current) =>
      current.map((activity) => {
        if (activity.id !== activityId) {
          return activity;
        }

        return {
          ...activity,

          startDate,

          endDate,

          left,
        };
      }),
    );
  }

  return {
    activities,

    setActivities,

    moveActivity,
  };
}
