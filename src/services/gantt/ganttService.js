import { getGanttActivities } from "@/data/repositories/ganttRepository";

import { buildGantt } from "./engine";

export function getGanttData({ dayWidth = 32 } = {}) {
  const activities = getGanttActivities();

  if (!activities.length) {
    return {
      months: [],
      activities: [],
      dependencies: [],
    };
  }

  const projectStart = new Date(
    Math.min(
      ...activities.map((activity) => new Date(activity.startDate).getTime()),
    ),
  );

  const projectEnd = new Date(
    Math.max(
      ...activities.map((activity) => new Date(activity.endDate).getTime()),
    ),
  );

  return buildGantt({
    activities,
    projectStart,
    projectEnd,
    dayWidth,
  });
}
