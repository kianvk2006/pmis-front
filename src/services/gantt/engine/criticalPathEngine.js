function duration(start, end) {
  return Math.max(
    Math.floor((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)),
    1,
  );
}

export function buildCriticalPath(activities = []) {
  const map = new Map();

  activities.forEach((activity) => {
    map.set(activity.id, {
      ...activity,

      ES: 0,

      EF: 0,

      LS: 0,

      LF: 0,

      TF: 0,

      duration: duration(activity.startDate, activity.endDate),
    });
  });

  return map;
}
