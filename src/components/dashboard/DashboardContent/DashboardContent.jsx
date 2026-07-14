import DashboardCard from "../DashboardCard";
import Activities from "../Activities";
import Notifications from "../Notifications";
import SCurve from "../SCurve";
import GaugeCharts from "../GaugeCharts";

import {
  ProgressChart,
  DonutChart,
} from "../Charts";

export default function DashboardContent() {
  return (
    <section className="mt-8 grid grid-cols-12 gap-6">

      {/* ستون اصلی */}
      <div className="col-span-8 space-y-6">

        <DashboardCard title="روند پیشرفت پروژه">
          <ProgressChart />
        </DashboardCard>

        <SCurve />

        <GaugeCharts />

      </div>

      {/* ستون کناری */}
      <div className="col-span-4 space-y-6">

        <DashboardCard title="توزیع فعالیت‌ها">
          <DonutChart />
        </DashboardCard>

        <Notifications />

        <Activities />

      </div>

    </section>
  );
}