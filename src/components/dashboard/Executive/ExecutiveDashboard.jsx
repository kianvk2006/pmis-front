import ExecutiveHeader from "./ExecutiveHeader";

import { ExecutiveKPIs, ExecutiveGauges } from "./ExecutiveCards";

import { ExecutivePerformanceChart, PerformanceCard } from "./Charts";

import ExecutiveActivities from "./ExecutiveActivities";
import ExecutiveRisks from "./ExecutiveRisks";
import ExecutiveContracts from "./ExecutiveContracts";
import ExecutiveMilestones from "./ExecutiveMilestones";

export default function ExecutiveDashboard() {
  return (
    <div className="space-y-8">
      <ExecutiveHeader />

      <ExecutiveKPIs />

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <PerformanceCard title="روند عملکرد پروژه (EVM)">
            <ExecutivePerformanceChart />
          </PerformanceCard>
        </div>

        <div className="col-span-4">
          <ExecutiveGauges />
        </div>
      </section>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <ExecutiveActivities />
        </div>

        <div className="col-span-5">
          <ExecutiveRisks />
        </div>
      </section>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <ExecutiveContracts />
        </div>

        <div className="col-span-5">
          <ExecutiveMilestones />
        </div>
      </section>
    </div>
  );
}
