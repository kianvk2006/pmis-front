import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { sCurveData } from "@/mocks/dashboard/scurve";
  
export default function SCurveChart() {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <LineChart
        data={sCurveData}
        margin={{
          top: 20,
          right: 20,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" />

        <XAxis
          dataKey="month"
          tick={{
            fill: "#64748B",
            fontSize: 13,
          }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          domain={[0, 100]}
          tickCount={6}
          tick={{
            fill: "#64748B",
            fontSize: 13,
          }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            borderRadius: 14,
            border: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        />

        <Line
          type="monotone"
          dataKey="planned"
          stroke="#2563EB"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6 }}
        />

        <Line
          type="monotone"
          dataKey="actual"
          stroke="#16A34A"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6 }}
        />

        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#F97316"
          strokeWidth={3}
          strokeDasharray="8 5"
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
