export default function getTaskColor(activity) {
  if (activity.critical) {
    return {
      background: "bg-red-600",

      progress: "bg-red-800",
    };
  }

  if (activity.progress >= 100) {
    return {
      background: "bg-green-300",

      progress: "bg-green-600",
    };
  }

  if (activity.progress > 0) {
    return {
      background: "bg-blue-300",

      progress: "bg-blue-600",
    };
  }

  return {
    background: "bg-slate-300",

    progress: "bg-slate-500",
  };
}
