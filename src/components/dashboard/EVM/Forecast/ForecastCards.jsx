import { useCallback, useEffect, useMemo, useState } from "react";

import { getEVMData } from "@/data/evm/evmRepository";

import ForecastCard from "./ForecastCard";

function normalizeNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

export default function ForecastCards() {
  const [evmData, setEVMData] = useState(null);

  const loadData = useCallback(() => {
    try {
      setEVMData(getEVMData());
    } catch (error) {
      console.error("LOAD_EVM_FORECAST_ERROR", error);

      setEVMData(null);
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

  const cards = useMemo(() => {
    const eac = normalizeNumber(evmData?.eac);

    const etc = normalizeNumber(evmData?.etc);

    const bac = normalizeNumber(evmData?.bac);

    const vac = normalizeNumber(evmData?.vac);

    return [
      {
        id: "eac",

        title: "EAC - برآورد هزینه نهایی",

        value: eac,

        unit: "واحد مالی",

        description: "برآورد هزینه کل پروژه در زمان تکمیل بر اساس عملکرد فعلی.",

        icon: "estimate",

        color: eac !== null && bac !== null && eac > bac ? "red" : "blue",
      },

      {
        id: "etc",

        title: "ETC - هزینه موردنیاز تا تکمیل",

        value: etc,

        unit: "واحد مالی",

        description: "برآورد هزینه باقیمانده موردنیاز برای تکمیل پروژه.",

        icon: "remaining",

        color: "orange",
      },

      {
        id: "bac",

        title: "BAC - بودجه کل پروژه",

        value: bac,

        unit: "واحد مالی",

        description: "بودجه مصوب کل پروژه بر اساس Baseline فعلی.",

        icon: "budget",

        color: "slate",
      },

      {
        id: "vac",

        title: "VAC - انحراف بودجه در پایان",

        value: vac,

        unit: "واحد مالی",

        description: "اختلاف بودجه کل پروژه با هزینه پیش‌بینی‌شده در پایان.",

        icon: vac !== null && vac >= 0 ? "positive" : "negative",

        color: vac === null ? "slate" : vac >= 0 ? "green" : "red",
      },
    ];
  }, [evmData]);

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          پیش‌بینی هزینه پروژه
        </h2>

        <p className="mt-2 text-slate-500">
          برآورد وضعیت مالی پروژه در زمان تکمیل بر اساس شاخص‌های EVM
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <ForecastCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
}
