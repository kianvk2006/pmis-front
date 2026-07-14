import { useCallback, useEffect, useMemo, useState } from "react";

import { CalendarClock, CircleDollarSign } from "lucide-react";

import { getEVMData } from "@/data/evm/evmRepository";

function normalizeNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function formatValue(value) {
  if (value === null) {
    return "—";
  }

  return value.toLocaleString("fa-IR", {
    maximumFractionDigits: 2,
  });
}

function getVarianceConfig(value) {
  if (value === null) {
    return {
      label: "بدون داده",
      cardClass: "border-slate-200",
      iconClass: "bg-slate-100 text-slate-500",
      valueClass: "text-slate-700",
      badgeClass: "bg-slate-100 text-slate-600",
    };
  }

  if (value >= 0) {
    return {
      label: "مطلوب",
      cardClass: "border-green-200",
      iconClass: "bg-green-50 text-green-600",
      valueClass: "text-green-600",
      badgeClass: "bg-green-50 text-green-600",
    };
  }

  return {
    label: "نامطلوب",
    cardClass: "border-red-200",
    iconClass: "bg-red-50 text-red-600",
    valueClass: "text-red-600",
    badgeClass: "bg-red-50 text-red-600",
  };
}

function VarianceCard({ title, value, description, icon: Icon }) {
  const config = getVarianceConfig(value);

  return (
    <article
      className={`
        rounded-3xl
        border
        bg-white
        p-6
        shadow-sm
        ${config.cardClass}
      `}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <div className="mt-4 flex items-center gap-3">
            <strong className={`text-4xl font-black ${config.valueClass}`}>
              {formatValue(value)}
            </strong>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-bold
                ${config.badgeClass}
              `}
            >
              {config.label}
            </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-500">{description}</p>
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            ${config.iconClass}
          `}
        >
          <Icon size={26} />
        </div>
      </div>
    </article>
  );
}

export default function VarianceCards() {
  const [evmData, setEVMData] = useState(null);

  const loadData = useCallback(() => {
    try {
      setEVMData(getEVMData());
    } catch (error) {
      console.error("LOAD_EVM_VARIANCES_ERROR", error);

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

  const variances = useMemo(() => {
    return {
      sv: normalizeNumber(evmData?.sv),

      cv: normalizeNumber(evmData?.cv),
    };
  }, [evmData]);

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">انحرافات پروژه</h2>

        <p className="mt-2 text-slate-500">
          تحلیل انحراف زمان‌بندی و هزینه بر اساس داده‌های فعلی پروژه
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <VarianceCard
          title="SV - انحراف زمان‌بندی"
          value={variances.sv}
          description="اختلاف ارزش کسب‌شده با ارزش برنامه‌ریزی‌شده؛ مقدار منفی نشان‌دهنده عقب‌ماندگی از برنامه است."
          icon={CalendarClock}
        />

        <VarianceCard
          title="CV - انحراف هزینه"
          value={variances.cv}
          description="اختلاف ارزش کسب‌شده با هزینه واقعی؛ مقدار منفی نشان‌دهنده عملکرد نامطلوب هزینه‌ای است."
          icon={CircleDollarSign}
        />
      </div>
    </section>
  );
}
