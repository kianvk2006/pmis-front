import { useCallback, useEffect, useMemo, useState } from "react";

import { AlertTriangle } from "lucide-react";

import { getEVMData } from "@/data/evm/evmRepository";

import AlertItem from "./AlertItem";

function normalizeNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

export default function Alerts() {
  const [evmData, setEVMData] = useState(null);

  const loadData = useCallback(() => {
    try {
      const data = getEVMData();

      setEVMData(data);
    } catch (error) {
      console.error("LOAD_EVM_ALERTS_ERROR", error);

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

  const alerts = useMemo(() => {
    const result = [];

    const spi = normalizeNumber(evmData?.spi);

    const cpi = normalizeNumber(evmData?.cpi);

    const vac = normalizeNumber(evmData?.vac);

    /*
      وضعیت زمان‌بندی
    */

    if (spi !== null && spi < 0.9) {
      result.push({
        id: "critical-spi",

        title: "عقب‌ماندگی جدی از برنامه",

        description:
          "شاخص SPI کمتر از ۰٫۹ است و پروژه از برنامه زمان‌بندی عقب‌تر از محدوده قابل قبول قرار دارد.",

        type: "critical",

        icon: "schedule",
      });
    } else if (spi !== null && spi < 1) {
      result.push({
        id: "warning-spi",

        title: "عقب‌ماندگی از برنامه",

        description:
          "شاخص SPI کمتر از ۱ است و پیشرفت واقعی پروژه از برنامه مصوب عقب‌تر است.",

        type: "warning",

        icon: "schedule",
      });
    } else if (spi !== null) {
      result.push({
        id: "success-spi",

        title: "عملکرد زمان‌بندی مطلوب است",

        description: "شاخص SPI در محدوده قابل قبول قرار دارد.",

        type: "success",

        icon: "success",
      });
    }

    /*
      وضعیت هزینه
    */

    if (cpi !== null && cpi < 0.9) {
      result.push({
        id: "critical-cpi",

        title: "عملکرد هزینه‌ای نامطلوب است",

        description:
          "شاخص CPI کمتر از ۰٫۹ است و هزینه واقعی پروژه نسبت به ارزش کسب‌شده در وضعیت نامطلوب قرار دارد.",

        type: "critical",

        icon: "cost",
      });
    } else if (cpi !== null && cpi < 1) {
      result.push({
        id: "warning-cpi",

        title: "افزایش هزینه نسبت به عملکرد",

        description:
          "شاخص CPI کمتر از ۱ است و پروژه برای ایجاد ارزش فعلی بیش از مقدار مطلوب هزینه کرده است.",

        type: "warning",

        icon: "cost",
      });
    } else if (cpi !== null) {
      result.push({
        id: "success-cpi",

        title: "عملکرد هزینه‌ای مطلوب است",

        description: "شاخص CPI در محدوده قابل قبول قرار دارد.",

        type: "success",

        icon: "success",
      });
    }

    /*
      وضعیت پیش‌بینی بودجه
    */

    if (vac !== null && vac < 0) {
      result.push({
        id: "critical-vac",

        title: "پیش‌بینی عبور از بودجه",

        description:
          "مقدار VAC منفی است و برآورد فعلی نشان می‌دهد هزینه نهایی پروژه از بودجه مصوب بیشتر خواهد شد.",

        type: "critical",

        icon: "budget",
      });
    } else if (vac !== null) {
      result.push({
        id: "success-vac",

        title: "پیش‌بینی بودجه قابل قبول است",

        description:
          "بر اساس VAC فعلی، عبور از بودجه مصوب پروژه پیش‌بینی نمی‌شود.",

        type: "success",

        icon: "success",
      });
    }

    return result;
  }, [evmData]);

  return (
    <section className="h-full rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <AlertTriangle size={22} />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900">هشدارهای EVM</h3>

          <p className="mt-1 text-sm text-slate-500">
            کنترل خودکار شاخص‌های پروژه
          </p>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="flex min-h-52 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
          <div>
            <p className="font-bold text-slate-700">
              داده کافی برای تحلیل وجود ندارد
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              پس از ثبت Baseline، پیشرفت و هزینه واقعی، هشدارهای EVM نمایش داده
              می‌شوند.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <AlertItem key={alert.id} {...alert} />
          ))}
        </div>
      )}
    </section>
  );
}
