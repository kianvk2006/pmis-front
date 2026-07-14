import { useCallback, useEffect, useMemo, useState } from "react";

import KPICard from "./KPICard";

import {
  getProgressRecords,
  getEquipmentRecords,
  getDelayRecords,
} from "@/data/repositories/projectRepository";

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function getProgressValue(item) {
  return normalizeNumber(
    item?.progressPercent ??
      item?.progress ??
      item?.actualProgress ??
      item?.percentage ??
      item?.percent ??
      0,
  );
}

function getActivityId(item) {
  return item?.activityId ?? item?.wbsId ?? item?.taskId ?? item?.id ?? null;
}

function getEquipmentId(item) {
  return item?.equipmentId ?? item?.machineId ?? item?.id ?? null;
}

function normalizeStatus(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function isActiveEquipment(item) {
  const status = normalizeStatus(item?.status);

  return ["active", "working", "operational", "فعال"].includes(status);
}

function calculateAverageProgress(records) {
  const validRecords = records
    .map(getProgressValue)
    .filter((value) => value >= 0);

  if (validRecords.length === 0) {
    return 0;
  }

  const total = validRecords.reduce((sum, value) => sum + value, 0);

  return total / validRecords.length;
}

export default function KPIGrid() {
  const [progressRecords, setProgressRecords] = useState([]);

  const [equipmentRecords, setEquipmentRecords] = useState([]);

  const [delayRecords, setDelayRecords] = useState([]);

  const loadData = useCallback(() => {
    try {
      setProgressRecords(normalizeArray(getProgressRecords()));

      setEquipmentRecords(normalizeArray(getEquipmentRecords()));

      setDelayRecords(normalizeArray(getDelayRecords()));
    } catch (error) {
      console.error("LOAD_EXECUTION_KPI_ERROR", error);

      setProgressRecords([]);
      setEquipmentRecords([]);
      setDelayRecords([]);
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

  const kpiItems = useMemo(() => {
    /*
      آخرین رکورد هر فعالیت را نگه می‌داریم
      تا یک فعالیت چند بار در Average حساب نشود.
    */

    const latestActivityRecords = new Map();

    progressRecords.forEach((item) => {
      const activityId = getActivityId(item);

      if (!activityId) {
        return;
      }

      const currentRecord = latestActivityRecords.get(activityId);

      const currentTime = new Date(
        currentRecord?.submittedAt ??
          currentRecord?.reportDate ??
          currentRecord?.updatedAt ??
          0,
      ).getTime();

      const nextTime = new Date(
        item?.submittedAt ?? item?.reportDate ?? item?.updatedAt ?? 0,
      ).getTime();

      if (!currentRecord || nextTime >= currentTime) {
        latestActivityRecords.set(activityId, item);
      }
    });

    const activities = Array.from(latestActivityRecords.values());

    const averageProgress = calculateAverageProgress(activities);

    /*
      تجهیزات Unique

      چون یک تجهیز ممکن است در چند گزارش
      تکرار شده باشد.
    */

    const latestEquipmentRecords = new Map();

    equipmentRecords.forEach((item) => {
      const equipmentId = getEquipmentId(item);

      if (!equipmentId) {
        return;
      }

      const currentRecord = latestEquipmentRecords.get(equipmentId);

      const currentTime = new Date(
        currentRecord?.submittedAt ?? currentRecord?.reportDate ?? 0,
      ).getTime();

      const nextTime = new Date(
        item?.submittedAt ?? item?.reportDate ?? 0,
      ).getTime();

      if (!currentRecord || nextTime >= currentTime) {
        latestEquipmentRecords.set(equipmentId, item);
      }
    });

    const equipments = Array.from(latestEquipmentRecords.values());

    const activeEquipmentCount = equipments.filter(isActiveEquipment).length;

    return [
      {
        title: "میانگین پیشرفت فعالیت‌ها",

        value: averageProgress.toLocaleString("fa-IR", {
          maximumFractionDigits: 1,
        }),

        unit: "%",

        change:
          activities.length > 0
            ? `${activities.length.toLocaleString("fa-IR")} فعالیت دارای داده`
            : "بدون داده اجرایی",

        icon: "progress",

        color: "green",
      },

      {
        title: "فعالیت‌های ثبت‌شده",

        value: activities.length.toLocaleString("fa-IR"),

        unit: "",

        change: `${progressRecords.length.toLocaleString(
          "fa-IR",
        )} رکورد اجرایی`,

        icon: "route",

        color: "blue",
      },

      {
        title: "تجهیزات فعال",

        value: activeEquipmentCount.toLocaleString("fa-IR"),

        unit: "",

        change: `${equipments.length.toLocaleString("fa-IR")} تجهیز ثبت‌شده`,

        icon: "truck",

        color: "orange",
      },

      {
        title: "تأخیرهای ثبت‌شده",

        value: delayRecords.length.toLocaleString("fa-IR"),

        unit: "",

        change:
          delayRecords.length > 0
            ? "نیازمند بررسی مدیریت پروژه"
            : "تأخیری ثبت نشده است",

        icon: "warning",

        color: "red",
      },
    ];
  }, [progressRecords, equipmentRecords, delayRecords]);

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {kpiItems.map((item) => (
        <KPICard key={item.title} {...item} />
      ))}
    </section>
  );
}
