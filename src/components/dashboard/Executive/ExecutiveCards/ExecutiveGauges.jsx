import GaugeCard from "./GaugeCard";

import useExecutiveDashboard from "@/hooks/useExecutiveDashboard";

export default function ExecutiveGauges() {
  const { dashboard } = useExecutiveDashboard();

  if (!dashboard) {
    return null;
  }

  return (
    <section className="grid grid-cols-4 gap-6">
      <GaugeCard
        title="سلامت پروژه"
        value={dashboard.kpis.progress}
        color="#10B981"
      />

      <GaugeCard
        title="سلامت زمان"
        value={dashboard.kpis.scheduleHealth}
        color="#3B82F6"
      />

      <GaugeCard
        title="سلامت بودجه"
        value={dashboard.kpis.budgetHealth}
        color="#F97316"
      />

      <GaugeCard
        title="ریسک پروژه"
        value={Math.min(dashboard.kpis.riskCount * 10, 100)}
        color="#EF4444"
      />
    </section>
  );
}
