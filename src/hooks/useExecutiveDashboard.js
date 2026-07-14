import { useCallback, useEffect, useState } from "react";

import { getExecutiveDashboardData } from "@/services/executiveDashboardService";

export default function useExecutiveDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    try {
      setLoading(true);

      const data = getExecutiveDashboardData();

      setDashboard(data);
    } catch (error) {
      console.error("EXECUTIVE_DASHBOARD_ERROR", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();

    window.addEventListener("pmis:data-updated", refresh);

    return () => {
      window.removeEventListener("pmis:data-updated", refresh);
    };
  }, [refresh]);

  return {
    dashboard,
    loading,
    refresh,
  };
}
