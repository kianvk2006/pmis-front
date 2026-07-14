import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { activityDistribution } from "@/mocks/dashboard";

import DonutLegend from "./DonutLegend";
import DonutCenter from "./DonutCenter";

export default function DonutChart() {
  return (
    <>
      <div className="relative h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={activityDistribution}
              dataKey="value"
              innerRadius={75}
              outerRadius={105}
              strokeWidth={0}
            >
              {activityDistribution.map((item) => (
                <Cell
                  key={item.name}
                  fill={item.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center">
          <DonutCenter />
        </div>
      </div>

      <DonutLegend data={activityDistribution} />
    </>
  );
}