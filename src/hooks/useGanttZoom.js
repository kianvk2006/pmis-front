import { useMemo, useState } from "react";

const widths = {
  day: 32,
  week: 14,
  month: 6,
};

export default function useGanttZoom() {
  const [zoom, setZoom] = useState("day");

  const dayWidth = useMemo(() => {
    return widths[zoom];
  }, [zoom]);

  return {
    zoom,
    dayWidth,
    setZoom,
  };
}
