import { Activity, Wallet, CalendarClock, ShieldAlert } from "lucide-react";

import KPIBox from "./KPIBox";

import useExecutiveDashboard from "@/hooks/useExecutiveDashboard";

export default function ExecutiveKPIs() {
  const { dashboard } = useExecutiveDashboard();

  if (!dashboard) return null;

  return (
    <section className="grid grid-cols-4 gap-6">
      <KPIBox
        title="پیشرفت پروژه"
        value={dashboard.kpis.progress}
        unit="%"
        percent={8}
        icon={Activity}
        color="orange"
      />

      <KPIBox
        title="سلامت بودجه"
        value={dashboard.kpis.budgetHealth}
        unit="%"
        percent={5}
        icon={Wallet}
        color="green"
      />

      <KPIBox
        title="سلامت زمان"
        value={dashboard.kpis.scheduleHealth}
        unit="%"
        percent={4}
        icon={CalendarClock}
        color="blue"
      />

      <KPIBox
        title="ریسک پروژه"
        value={dashboard.kpis.riskCount}
        percent={dashboard.kpis.riskCount}
        icon={ShieldAlert}
        color="red"
        trend="down"
      />
    </section>
  );
}
