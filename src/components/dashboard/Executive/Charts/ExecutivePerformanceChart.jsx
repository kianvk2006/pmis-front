import { useEffect, useMemo, useState, useCallback } from "react";

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

const PROJECT_ID = "PROJECT-001";

function normalizeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

export default function ExecutivePerformanceChart() {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(() => {
    try {
      setLoading(true);

      const result = getEVMHistory({
        projectId: PROJECT_ID,
      });

      setHistory(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("LOAD_EXECUTIVE_PERFORMANCE_ERROR", error);

      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();

    window.addEventListener("pmis:data-updated", loadHistory);

    return () => {
      window.removeEventListener("pmis:data-updated", loadHistory);
    };
  }, [loadHistory]);

  const chartData = useMemo(() => {
    return history.map((item) => ({
      month: item.label,

      pv: normalizeNumber(item.pv),

      ev: normalizeNumber(item.ev),

      ac: normalizeNumber(item.ac),
    }));
  }, [history]);

  if (loading) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <p className="text-slate-500">در حال بارگذاری...</p>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
        <div className="text-center">
          <p className="font-bold text-slate-700">
            هنوز اطلاعاتی برای نمایش نمودار وجود ندارد
          </p>

          <p className="mt-2 text-sm text-slate-500">
            ابتدا Baseline و گزارش‌های پیشرفت پروژه را ثبت کنید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="4 4" />

        <XAxis dataKey="month" />

        <YAxis
          tickFormatter={(value) => Number(value).toLocaleString("fa-IR")}
        />

        <Tooltip formatter={(value) => Number(value).toLocaleString("fa-IR")} />

        <Legend />

        <Line
          type="monotone"
          dataKey="pv"
          name="Planned Value"
          stroke="#2563eb"
          strokeWidth={3}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="ev"
          name="Earned Value"
          stroke="#f97316"
          strokeWidth={3}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="ac"
          name="Actual Cost"
          stroke="#22c55e"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
