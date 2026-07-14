import { useCallback, useEffect, useState } from "react";

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

import { getEVMHistory } from "@/data/evm/evmRepository";

function formatValue(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toLocaleString("fa-IR", {
    maximumFractionDigits: 2,
  });
}

export default function EVMChart() {
  const [chartData, setChartData] = useState([]);

  const loadData = useCallback(() => {
    try {
      const history = getEVMHistory();

      setChartData(Array.isArray(history) ? history : []);
    } catch (error) {
      console.error("LOAD_EVM_CHART_ERROR", error);

      setChartData([]);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleDataUpdated = () => {
      loadData();
    };

    window.addEventListener("pmis:data-updated", handleDataUpdated);

    return () => {
      window.removeEventListener("pmis:data-updated", handleDataUpdated);
    };
  }, [loadData]);

  if (chartData.length === 0) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
        <div className="text-center">
          <p className="font-bold text-slate-700">
            هنوز اطلاعاتی برای نمودار EVM وجود ندارد
          </p>

          <p className="mt-2 text-sm text-slate-500">
            پس از ثبت Baseline و اطلاعات پیشرفت پروژه، نمودار PV، EV و AC نمایش
            داده می‌شود.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={420}>
      <LineChart
        data={chartData}
        margin={{
          top: 10,
          right: 20,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        <XAxis dataKey="label" tickMargin={10} />

        <YAxis tickMargin={10} tickFormatter={formatValue} />

        <Tooltip formatter={(value, name) => [formatValue(value), name]} />

        <Legend />

        <Line
          type="monotone"
          dataKey="pv"
          stroke="#2563EB"
          strokeWidth={3}
          name="PV"
          dot={false}
          activeDot={{
            r: 6,
          }}
        />

        <Line
          type="monotone"
          dataKey="ev"
          stroke="#16A34A"
          strokeWidth={3}
          name="EV"
          dot={false}
          activeDot={{
            r: 6,
          }}
        />

        <Line
          type="monotone"
          dataKey="ac"
          stroke="#EA580C"
          strokeWidth={3}
          name="AC"
          dot={false}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
