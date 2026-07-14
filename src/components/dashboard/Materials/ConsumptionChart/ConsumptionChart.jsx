import { useMemo, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MATERIAL_CATALOG = {
  "MAT-001": {
    name: "سیمان",
    unit: "کیسه",
  },

  "MAT-002": {
    name: "آرماتور",
    unit: "تن",
  },

  "MAT-003": {
    name: "بتن آماده",
    unit: "متر³",
  },

  "MAT-004": {
    name: "شن و ماسه",
    unit: "تن",
  },

  "MAT-005": {
    name: "ریل",
    unit: "متر",
  },
};

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeQuantity(value) {
  const quantity = Number(value);

  return Number.isFinite(quantity) ? quantity : 0;
}

function getMaterialName(materialId, item) {
  return (
    item?.materialName ??
    item?.name ??
    MATERIAL_CATALOG[materialId]?.name ??
    materialId ??
    "مصالح نامشخص"
  );
}

function getMaterialUnit(materialId, item) {
  return item?.unit ?? MATERIAL_CATALOG[materialId]?.unit ?? "-";
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("fa-IR");
}

function getDateTime(value) {
  const date = new Date(value);

  const time = date.getTime();

  return Number.isNaN(time) ? 0 : time;
}

function buildChartData(records, selectedMaterialId) {
  const dateMap = new Map();

  records.forEach((item) => {
    if (item?.materialId !== selectedMaterialId) {
      return;
    }

    const reportDate =
      item?.reportDate ?? item?.date ?? item?.submittedAt ?? item?.createdAt;

    if (!reportDate) {
      return;
    }

    const quantity = normalizeQuantity(item.quantity);

    const currentQuantity = dateMap.get(reportDate) ?? 0;

    dateMap.set(reportDate, currentQuantity + quantity);
  });

  return Array.from(dateMap.entries())
    .map(([date, actual]) => ({
      date,
      actual,
    }))
    .sort(
      (firstItem, secondItem) =>
        getDateTime(firstItem.date) - getDateTime(secondItem.date),
    );
}

function CustomTooltip({ active, payload, label, unit }) {
  if (!active || !Array.isArray(payload) || payload.length === 0) {
    return null;
  }

  const value = Number(payload[0]?.value) || 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
      <p className="font-bold text-slate-800">{formatDate(label)}</p>

      <p className="mt-2 text-sm text-slate-500">
        مصرف واقعی:
        <span className="mr-2 font-bold text-orange-600">
          {value.toLocaleString("fa-IR", {
            maximumFractionDigits: 2,
          })}{" "}
          {unit}
        </span>
      </p>
    </div>
  );
}

export default function ConsumptionChart({ materialConsumptions = [] }) {
  const records = normalizeArray(materialConsumptions);

  /*
    لیست مصالحی که واقعاً
    در گزارش‌ها مصرف ثبت‌شده دارند.
  */

  const availableMaterials = useMemo(() => {
    const materialMap = new Map();

    records.forEach((item) => {
      if (!item?.materialId) {
        return;
      }

      if (!materialMap.has(item.materialId)) {
        materialMap.set(item.materialId, {
          id: item.materialId,

          name: getMaterialName(item.materialId, item),

          unit: getMaterialUnit(item.materialId, item),
        });
      }
    });

    return Array.from(materialMap.values());
  }, [records]);

  /*
    انتخاب مصالح

    اگر مصالح انتخاب‌شده دیگر
    داخل داده‌ها وجود نداشته باشد،
    اولین مصالح موجود انتخاب می‌شود.
  */

  const [selectedMaterialId, setSelectedMaterialId] = useState("");

  const activeMaterialId = availableMaterials.some(
    (item) => item.id === selectedMaterialId,
  )
    ? selectedMaterialId
    : (availableMaterials[0]?.id ?? "");

  const selectedMaterial =
    availableMaterials.find((item) => item.id === activeMaterialId) ?? null;

  const chartData = useMemo(
    () => buildChartData(records, activeMaterialId),
    [records, activeMaterialId],
  );

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold">روند مصرف مصالح</h2>

          <p className="mt-2 text-slate-500">
            روند مصرف واقعی هر مصالح بر اساس گزارش‌های ثبت‌شده کارگاه
          </p>
        </div>

        {availableMaterials.length > 0 && (
          <div className="min-w-[220px]">
            <label
              htmlFor="consumption-material"
              className="mb-2 block text-sm font-semibold text-slate-600"
            >
              انتخاب مصالح
            </label>

            <select
              id="consumption-material"
              value={activeMaterialId}
              onChange={(event) => setSelectedMaterialId(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500"
            >
              {availableMaterials.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.unit})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {availableMaterials.length === 0 ? (
        <div className="flex h-[340px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
          <div className="text-center">
            <p className="font-bold text-slate-700">
              هنوز مصرف مصالحی ثبت نشده است
            </p>

            <p className="mt-2 text-sm text-slate-500">
              پس از ثبت مصرف مصالح در گزارش کارگاه، روند مصرف در این بخش نمایش
              داده می‌شود.
            </p>
          </div>
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex h-[340px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
          <p className="font-bold text-slate-700">
            برای مصالح انتخاب‌شده داده‌ای وجود ندارد.
          </p>
        </div>
      ) : (
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 10,
              }}
            >
              <defs>
                <linearGradient
                  id="actualConsumption"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />

                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4 4" vertical={false} />

              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tickMargin={10}
              />

              <YAxis tickMargin={10} allowDecimals />

              <Tooltip
                content={<CustomTooltip unit={selectedMaterial?.unit ?? "-"} />}
              />

              <Area
                type="monotone"
                dataKey="actual"
                stroke="#f97316"
                fill="url(#actualConsumption)"
                strokeWidth={3}
                name="مصرف واقعی"
                connectNulls
                activeDot={{
                  r: 6,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
