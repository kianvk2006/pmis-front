import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { executivePerformance } from "@/mocks/dashboard/executive";

export default function ExecutivePerformanceChart() {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <LineChart data={executivePerformance}>

        <CartesianGrid strokeDasharray="4 4" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Line
          type="monotone"
          dataKey="planned"
          stroke="#2563eb"
          strokeWidth={3}
          dot={false}
          name="برنامه"
        />

        <Line
          type="monotone"
          dataKey="actual"
          stroke="#f97316"
          strokeWidth={3}
          dot={false}
          name="واقعی"
        />

        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#22c55e"
          strokeDasharray="6 4"
          strokeWidth={3}
          dot={false}
          name="پیش‌بینی"
        />

      </LineChart>
    </ResponsiveContainer>
  );
}