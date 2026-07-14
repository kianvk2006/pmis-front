import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Wallet,
  DollarSign,
  TrendingUp,
  BarChart3,
  Clock3,
  Activity,
  AlertTriangle,
  Minus,
} from "lucide-react";

import { getEVMData } from "@/data/evm/evmRepository";

import EVMCard from "./EVMCard";

function normalizeNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function getIndexStatus(value) {
  if (value === null) {
    return "neutral";
  }

  if (value >= 1) {
    return "positive";
  }

  if (value >= 0.9) {
    return "warning";
  }

  return "negative";
}

function getVarianceStatus(value) {
  if (value === null) {
    return "neutral";
  }

  return value >= 0 ? "positive" : "negative";
}

export default function EVMKPIs() {
  const [evmData, setEVMData] = useState(null);

  const loadData = useCallback(() => {
    try {
      const data = getEVMData();

      setEVMData(data);
    } catch (error) {
      console.error("LOAD_EVM_KPIS_ERROR", error);

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
    const pv = normalizeNumber(evmData?.pv);

    const ev = normalizeNumber(evmData?.ev);

    const ac = normalizeNumber(evmData?.ac);

    const bac = normalizeNumber(evmData?.bac);

    const spi = normalizeNumber(evmData?.spi);

    const cpi = normalizeNumber(evmData?.cpi);

    const sv = normalizeNumber(evmData?.sv);

    const vac = normalizeNumber(evmData?.vac);

    return [
      {
        id: "pv",

        title: "PV - ارزش برنامه‌ریزی‌شده",

        value: pv,

        unit: "واحد مالی",

        icon: BarChart3,

        color: "blue",

        status: "neutral",
      },

      {
        id: "ev",

        title: "EV - ارزش کسب‌شده",

        value: ev,

        unit: "واحد مالی",

        icon: TrendingUp,

        color: "green",

        status: "neutral",
      },

      {
        id: "ac",

        title: "AC - هزینه واقعی",

        value: ac,

        unit: "واحد مالی",

        icon: DollarSign,

        color: "orange",

        status: "neutral",
      },

      {
        id: "bac",

        title: "BAC - بودجه کل",

        value: bac,

        unit: "واحد مالی",

        icon: Wallet,

        color: "purple",

        status: "neutral",
      },

      {
        id: "spi",

        title: "SPI",

        value: spi,

        icon: Clock3,

        color: "yellow",

        status: getIndexStatus(spi),

        maximumFractionDigits: 2,
      },

      {
        id: "cpi",

        title: "CPI",

        value: cpi,

        icon: Activity,

        color: "sky",

        status: getIndexStatus(cpi),

        maximumFractionDigits: 2,
      },

      {
        id: "sv",

        title: "SV - انحراف زمان‌بندی",

        value: sv,

        unit: "واحد مالی",

        icon: AlertTriangle,

        color: "red",

        status: getVarianceStatus(sv),
      },

      {
        id: "vac",

        title: "VAC - انحراف بودجه پایان",

        value: vac,

        unit: "واحد مالی",

        icon: Minus,

        color: "red",

        status: getVarianceStatus(vac),
      },
    ];
  }, [evmData]);

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <EVMCard key={card.id} {...card} />
      ))}
    </section>
  );
}
