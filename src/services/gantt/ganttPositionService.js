const DAY_WIDTH = 32;

function diffDays(start, end) {
  const first = new Date(start);
  const second = new Date(end);

  return Math.floor((second - first) / (1000 * 60 * 60 * 24));
}

export function calculateBarPosition(activity, projectStart) {
  const offset = diffDays(projectStart, activity.startDate);

  const duration = Math.max(diffDays(activity.startDate, activity.endDate), 1);

  return {
    left: offset * DAY_WIDTH,
    width: duration * DAY_WIDTH,
  };
}
