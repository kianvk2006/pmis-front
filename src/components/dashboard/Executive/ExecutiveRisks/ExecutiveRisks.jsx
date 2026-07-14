import { useEffect, useState } from "react";

import RiskCard from "./RiskCard";

import { getExecutiveRisks } from "@/services/executiveDashboardService";

export default function ExecutiveRisks() {
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    setRisks(getExecutiveRisks());
  }, []);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-bold">ریسک‌ها و هشدارهای فعال</h3>

      <div className="space-y-4">
        {risks.map((risk) => (
          <RiskCard key={risk.id} {...risk} />
        ))}
      </div>
    </div>
  );
}
