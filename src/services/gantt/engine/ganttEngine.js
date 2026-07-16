import { buildLayout } from "./layoutEngine";
import { buildMonths } from "./calendarEngine";
import { buildDependencies } from "./dependencyEngine";
import { buildCriticalPath } from "./criticalPathEngine";

export function buildGantt({ activities, projectStart, projectEnd, dayWidth }) {
  const months = buildMonths(projectStart, projectEnd);

  const critical = buildCriticalPath(activities);

  const layout = buildLayout(activities, projectStart, dayWidth);

  const dependencies = buildDependencies(layout);

  return {
    months,

    activities: layout.map((activity) => ({
      ...activity,

      critical: critical.get(activity.id)?.TF === 0,
    })),

    dependencies,
  };
}
