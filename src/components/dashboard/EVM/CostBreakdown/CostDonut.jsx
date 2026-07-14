import { useCallback, useEffect, useMemo, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { getActualCostRecords } from "@/data/repositories/projectRepository";

const PROJECT_ID = "PROJECT-001";

const CATEGORY_CONFIG = {
  workforce: {
    label: "نیروی انسانی",
    color: "#2563EB",
  },

  equipment: {
    label: "تجهیزات",
    color: "#16A34A",
  },

  materials: {
    label: "مصالح",
    color: "#EA580C",
  },

  subcontractor: {
    label: "پیمانکار جزء",
    color: "#9333EA",
  },

  transportation: {
    label: "حمل‌ونقل",
    color: "#0891B2",
  },

  other: {
    label: "سایر",
    color: "#64748B",
  },
};

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

export default function CostDonut() {
  const [records, setRecords] = useState([]);

  const loadData = useCallback(() => {
    try {
      const storedRecords = getActualCostRecords(PROJECT_ID);

      setRecords(normalizeArray(storedRecords));
    } catch (error) {
      console.error("LOAD_COST_BREAKDOWN_ERROR", error);

      setRecords([]);
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

  const data = useMemo(() => {
    const categoryTotals = new Map();

    records.forEach((record) => {
      const category = record?.category ?? "other";

      const currentValue = categoryTotals.get(category) ?? 0;

      categoryTotals.set(
        category,
        currentValue + normalizeNumber(record?.amount),
      );
    });

    return Array.from(categoryTotals.entries())
      .map(([category, value]) => {
        const config = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.other;

        return {
          category,

          name: config.label,

          value,

          color: config.color,
        };
      })
      .filter((item) => item.value > 0);
  }, [records]);

  if (data.length === 0) {
    return (
      <div className="flex h-[340px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 text-center">
        <div>
          <p className="font-bold text-slate-700">
            هنوز هزینه واقعی ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            پس از ثبت هزینه‌های پروژه، ترکیب هزینه‌ها در این نمودار نمایش داده
            می‌شود.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={340}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry) => (
            <Cell key={entry.category} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip formatter={(value) => Number(value).toLocaleString("fa-IR")} />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
