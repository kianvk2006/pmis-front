export function buildDependencies(activities = []) {
  const map = new Map();

  activities.forEach((activity) => {
    map.set(activity.id, activity);
  });

  const dependencies = [];

  activities.forEach((activity) => {
    const predecessors = activity.predecessors ?? [];

    predecessors.forEach((predecessorId) => {
      const predecessor = map.get(predecessorId);

      if (!predecessor) {
        return;
      }

      dependencies.push({
        id: `${predecessor.id}-${activity.id}`,

        from: predecessor.id,

        to: activity.id,

        fromX: predecessor.left + predecessor.width,

        fromY: predecessor.top + predecessor.height / 2,

        toX: activity.left,

        toY: activity.top + activity.height / 2,
      });
    });
  });

  return dependencies;
}
