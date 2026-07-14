import EVMHeader from "./Header";
import { BaselineForm } from "./Baseline";
import { ActualCostForm } from "./ActualCosts";
import { EVMKPIs } from "./KPICards";
import { EVMChart, EVMChartCard } from "./Charts";
import { EVMGauges } from "./Gauges";
import { ForecastCards, VarianceCards } from "./Forecast";
import { CostBreakdown } from "./CostBreakdown";
import { Alerts } from "./Alerts";
import { Recommendations } from "./Recommendations";

export default function EVMDashboard() {
  return (
    <div className="space-y-8">
      <EVMHeader />

      <BaselineForm />

      <ActualCostForm />

      <EVMKPIs />

      <EVMChartCard>
        <EVMChart />

        <EVMGauges />
      </EVMChartCard>

      <ForecastCards />

      <VarianceCards />

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-5">
          <CostBreakdown />
        </div>

        <div className="col-span-3">
          <Alerts />
        </div>

        <div className="col-span-4">
          <Recommendations />
        </div>
      </section>
    </div>
  );
}
