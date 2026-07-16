import { useEffect, useState } from "react";

import useGanttZoom from "./useGanttZoom";
import useGanttStore from "./useGanttStore";

import { getGanttData } from "@/services/gantt/ganttService";

export default function useGantt() {
  const [loading, setLoading] = useState(true);

  const { zoom, dayWidth, setZoom } = useGanttZoom();

  const { activities, setActivities, moveActivity } = useGanttStore([]);

  const [dashboard, setDashboard] = useState({
    months: [],
    dependencies: [],
  });

  useEffect(() => {
    setLoading(true);

    const data = getGanttData({
      dayWidth,
    });

    setDashboard({
      months: data.months,
      dependencies: data.dependencies,
    });

    setActivities(data.activities);

    setLoading(false);
  }, [dayWidth]);

  return {
    dashboard,

    activities,

    loading,

    zoom,

    setZoom,

    moveActivity,
  };
}
