import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function GaugeChart({
  value,
  color,
}) {
  const data = [
    { value },
    { value: 100 - value },
  ];

  return (
    <div className="relative h-44">

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius={65}
            outerRadius={85}
            dataKey="value"
            stroke="none"
          >

            <Cell fill={color} />

            <Cell fill="#E5E7EB" />

          </Pie>

        </PieChart>

      </ResponsiveContainer>

      <div
        className="
        absolute
        bottom-5
        left-1/2
        -translate-x-1/2
        text-center
        "
      >

        <h2 className="text-3xl font-bold">

          {value}%

        </h2>

      </div>

    </div>
  );
}