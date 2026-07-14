import { useCallback, useEffect, useMemo, useState } from "react";

import { Lightbulb } from "lucide-react";

import { getEVMData } from "@/data/evm/evmRepository";

import RecommendationCard from "./RecommendationCard";

function normalizeNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

export default function Recommendations() {
  const [evmData, setEVMData] = useState(null);

  const loadData = useCallback(() => {
    try {
      const data = getEVMData();

      setEVMData(data);
    } catch (error) {
      console.error("LOAD_EVM_RECOMMENDATIONS_ERROR", error);

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

  const recommendations = useMemo(() => {
    const result = [];

    const spi = normalizeNumber(evmData?.spi);

    const cpi = normalizeNumber(evmData?.cpi);

    const vac = normalizeNumber(evmData?.vac);

    /*
      پیشنهادهای زمان‌بندی
    */

    if (spi !== null && spi < 0.9) {
      result.push({
        id: "schedule-recovery",

        title: "تدوین برنامه جبرانی زمان‌بندی",

        description:
          "فعالیت‌های بحرانی و عقب‌مانده بررسی شوند و برای افزایش سرعت اجرا، تخصیص منابع و توالی فعالیت‌ها بازنگری شود.",

        priority: "high",

        icon: "scheduleCritical",
      });
    } else if (spi !== null && spi < 1) {
      result.push({
        id: "schedule-review",

        title: "بازبینی فعالیت‌های عقب‌مانده",

        description:
          "فعالیت‌های مؤثر بر کاهش SPI شناسایی شوند و اقدامات اصلاحی برای جلوگیری از افزایش تأخیر اجرا شود.",

        priority: "medium",

        icon: "scheduleWarning",
      });
    }

    /*
      پیشنهادهای هزینه
    */

    if (cpi !== null && cpi < 0.9) {
      result.push({
        id: "cost-control",

        title: "اجرای برنامه فوری کنترل هزینه",

        description:
          "عوامل اصلی افزایش هزینه، بهره‌وری منابع، ماشین‌آلات و خرید مصالح بررسی و اقدامات اصلاحی تعریف شود.",

        priority: "high",

        icon: "costCritical",
      });
    } else if (cpi !== null && cpi < 1) {
      result.push({
        id: "cost-review",

        title: "بازبینی روند هزینه‌های پروژه",

        description:
          "هزینه‌های واقعی با ارزش کسب‌شده مقایسه شوند تا عوامل کاهش CPI پیش از ایجاد انحراف بحرانی کنترل شوند.",

        priority: "medium",

        icon: "costWarning",
      });
    }

    /*
      پیشنهاد پیش‌بینی هزینه نهایی
    */

    if (vac !== null && vac < 0) {
      result.push({
        id: "forecast-review",

        title: "بازنگری برآورد هزینه نهایی",

        description:
          "به دلیل VAC منفی، فرضیات EAC و ETC بازبینی و سناریوهای کاهش هزینه تا پایان پروژه بررسی شوند.",

        priority: "high",

        icon: "costCritical",
      });
    }

    /*
      اگر هیچ مشکل مهمی وجود نداشت
    */

    if (result.length === 0) {
      result.push({
        id: "maintain-performance",

        title: "حفظ روند فعلی عملکرد پروژه",

        description:
          "شاخص‌های فعلی انحراف مهمی نشان نمی‌دهند. ثبت منظم پیشرفت و هزینه‌ها ادامه پیدا کند تا تغییرات عملکرد سریع شناسایی شوند.",

        priority: "normal",

        icon: "success",
      });
    }

    return result;
  }, [evmData]);

  return (
    <section className="h-full rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          <Lightbulb size={22} />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900">
            پیشنهادهای مدیریتی
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            اقدامات پیشنهادی بر اساس شاخص‌های EVM
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <RecommendationCard key={recommendation.id} {...recommendation} />
        ))}
      </div>
    </section>
  );
}
