const MONTH_WIDTH = 140;

function getDaysDifference(start, end) {
  const first = new Date(start);
  const second = new Date(end);

  return Math.ceil((second - first) / (1000 * 60 * 60 * 24));
}

function getMonthName(date) {
  return new Intl.DateTimeFormat("fa-IR", {
    month: "long",
  }).format(date);
}

export function buildTimelineMonths(activities = []) {
  if (!activities.length) {
    return [];
  }

  const start = new Date(
    Math.min(...activities.map((item) => new Date(item.startDate).getTime())),
  );

  const end = new Date(
    Math.max(...activities.map((item) => new Date(item.endDate).getTime())),
  );

  const months = [];

  const current = new Date(start.getFullYear(), start.getMonth(), 1);

  while (current <= end) {
    months.push({
      label: getMonthName(current),
      year: current.getFullYear(),
      month: current.getMonth() + 1,
    });

    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

export function buildTimelineActivities(activities = []) {
  if (!activities.length) {
    return [];
  }

  const projectStart = new Date(activities[0].startDate);

  return activities.map((activity) => {
    const startOffset = getDaysDifference(projectStart, activity.startDate);

    const duration = getDaysDifference(activity.startDate, activity.endDate);

    const dayWidth = MONTH_WIDTH / 30;

    return {
      ...activity,

      position: startOffset * dayWidth,

      size: Math.max(duration * dayWidth, 40),
    };
  });
}
