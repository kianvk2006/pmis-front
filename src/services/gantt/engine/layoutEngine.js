const ROW_HEIGHT = 52;
const BAR_HEIGHT = 18;

function diffDays(start, end) {
  return Math.max(
    Math.floor((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)),
    1,
  );
}

export function buildLayout(activities, projectStart, dayWidth) {
  return activities.map((activity, index) => {
    const duration = diffDays(activity.startDate, activity.endDate);

    const offset = diffDays(projectStart, activity.startDate);

    const baselineOffset = activity.baselineStart
      ? diffDays(projectStart, activity.baselineStart)
      : offset;

    const baselineDuration = activity.baselineEnd
      ? diffDays(activity.baselineStart, activity.baselineEnd)
      : duration;

    return {
      ...activity,

      duration,

      row: index,

      left: offset * dayWidth,

      width: Math.max(duration * dayWidth, 16),

      baselineLeft: baselineOffset * dayWidth,

      baselineWidth: Math.max(baselineDuration * dayWidth, 16),

      top: index * ROW_HEIGHT + 12,

      height: BAR_HEIGHT,
    };
  });
}
