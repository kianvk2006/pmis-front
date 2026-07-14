import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getProgressRecords,
  getDelayRecords,
} from "@/data/repositories/projectRepository";

import RailwayLine from "./RailwayLine";
import Legend from "./Legend";

const ACTIVITY_CATALOG = {
  "ACT-001": "خاکبرداری",
  "ACT-002": "خاکریزی",
  "ACT-003": "اجرای زیرسازی",
  "ACT-004": "اجرای روسازی",
  "ACT-005": "ریل‌گذاری",
};

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function clampPercent(value) {
  return Math.min(100, Math.max(0, normalizeNumber(value)));
}

function getProgress(item) {
  return clampPercent(
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

function getRecordTime(item) {
  const value =
    item?.submittedAt ??
    item?.reportDate ??
    item?.updatedAt ??
    item?.createdAt ??
    0;

  const time = new Date(value).getTime();

  return Number.isNaN(time) ? 0 : time;
}

function getLatestActivities(records) {
  const activityMap = new Map();

  records.forEach((item) => {
    const activityId = getActivityId(item);

    if (!activityId) {
      return;
    }

    const currentRecord = activityMap.get(activityId);

    if (!currentRecord || getRecordTime(item) >= getRecordTime(currentRecord)) {
      activityMap.set(activityId, item);
    }
  });

  return Array.from(activityMap.values());
}

function getActivityName(item) {
  const activityId = getActivityId(item);

  return (
    item?.activityName ??
    item?.name ??
    item?.activity ??
    ACTIVITY_CATALOG[activityId] ??
    activityId ??
    "فعالیت نامشخص"
  );
}

function getDelayReason(item) {
  return item?.reason ?? item?.description ?? item?.title ?? "بدون توضیحات";
}

function getDelayId(item, index) {
  return item?.id ?? `${item?.reportId ?? "report"}-delay-${index}`;
}

export default function RouteProgress() {
  const [progressRecords, setProgressRecords] = useState([]);

  const [delayRecords, setDelayRecords] = useState([]);

  /*
    دریافت اطلاعات از Data Layer
  */

  const loadData = useCallback(() => {
    try {
      const storedProgressRecords = getProgressRecords();

      const storedDelayRecords = getDelayRecords();

      setProgressRecords(normalizeArray(storedProgressRecords));

      setDelayRecords(normalizeArray(storedDelayRecords));
    } catch (error) {
      console.error("LOAD_ROUTE_PROGRESS_ERROR", error);

      setProgressRecords([]);

      setDelayRecords([]);
    }
  }, []);

  /*
    دریافت اطلاعات هنگام باز شدن صفحه
  */

  useEffect(() => {
    loadData();
  }, [loadData]);

  /*
    بروزرسانی خودکار بعد از Submit / Update گزارش
  */

  useEffect(() => {
    const handleDataUpdated = () => {
      loadData();
    };

    window.addEventListener("pmis:data-updated", handleDataUpdated);

    return () => {
      window.removeEventListener("pmis:data-updated", handleDataUpdated);
    };
  }, [loadData]);

  /*
    محاسبه اطلاعات RouteProgress
  */

  const routeData = useMemo(() => {
    /*
      آخرین رکورد هر فعالیت
    */

    const activities = getLatestActivities(progressRecords);

    /*
      میانگین پیشرفت فعالیت‌ها
    */

    const totalProgress = activities.reduce(
      (total, item) => total + getProgress(item),
      0,
    );

    const averageProgress =
      activities.length > 0 ? totalProgress / activities.length : 0;

    /*
      مرتب‌سازی فعالیت‌ها

      فعلاً چون Route Master Data نداریم،
      بر اساس Activity ID مرتب می‌کنیم.
    */

    const sortedActivities = [...activities].sort((firstItem, secondItem) =>
      String(getActivityId(firstItem)).localeCompare(
        String(getActivityId(secondItem)),
      ),
    );

    /*
      Marker فعالیت‌ها

      موقعیت هر فعالیت روی خط
      برابر درصد پیشرفت واقعی همان فعالیت است.
    */

    const activityMarkers = sortedActivities.map((item) => {
      const progress = getProgress(item);

      return {
        id: getActivityId(item),

        name: getActivityName(item),

        progress,

        position: progress,
      };
    });

    /*
      Marker تأخیرها

      چون فعلاً Delay Record
      موقعیت واقعی روی مسیر ندارد،
      Markerها به صورت مساوی روی خط
      توزیع می‌شوند.

      بعداً با اضافه شدن Route Position
      به Data Model این قسمت اصلاح می‌شود.
    */

    const delayMarkers = delayRecords.map((item, index) => ({
      id: getDelayId(item, index),

      label: item?.activityName ?? item?.title ?? "تأخیر ثبت‌شده",

      reason: getDelayReason(item),

      position:
        delayRecords.length === 1
          ? 50
          : ((index + 1) / (delayRecords.length + 1)) * 100,
    }));

    /*
      آمار فعالیت‌ها
    */

    const completedCount = activities.filter(
      (item) => getProgress(item) >= 100,
    ).length;

    const inProgressCount = activities.filter((item) => {
      const progress = getProgress(item);

      return progress > 0 && progress < 100;
    }).length;

    const notStartedCount = activities.filter(
      (item) => getProgress(item) <= 0,
    ).length;

    return {
      averageProgress,

      activityMarkers,

      delayMarkers,

      completedCount,

      inProgressCount,

      notStartedCount,
    };
  }, [progressRecords, delayRecords]);

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            وضعیت اجرای عملیات
          </h2>

          <p className="mt-2 text-slate-500">
            نمای کلی آخرین پیشرفت فعالیت‌های اجرایی پروژه
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 px-5 py-3">
          <div className="text-xs text-slate-500">میانگین پیشرفت</div>

          <div className="mt-1 text-2xl font-bold text-orange-500">
            {averageProgressFormatter(routeData.averageProgress)}٪
          </div>
        </div>
      </div>

      {/* Empty State */}

      {routeData.activityMarkers.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="font-bold text-slate-700">
            هنوز اطلاعات اجرایی ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            پس از ثبت پیشرفت فعالیت‌ها در گزارش کارگاه، وضعیت اجرای عملیات در
            این بخش نمایش داده می‌شود.
          </p>
        </div>
      ) : (
        <>
          {/* Railway Progress */}

          <RailwayLine
            progress={routeData.averageProgress}
            activityMarkers={routeData.activityMarkers}
            delayMarkers={routeData.delayMarkers}
          />

          {/* Summary Cards */}

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-slate-100 p-5">
              <div className="text-sm text-slate-500">کل فعالیت‌ها</div>

              <div className="mt-2 text-2xl font-bold text-slate-900">
                {routeData.activityMarkers.length.toLocaleString("fa-IR")}
              </div>
            </div>

            <div className="rounded-2xl bg-green-50 p-5">
              <div className="text-sm text-slate-500">تکمیل‌شده</div>

              <div className="mt-2 text-2xl font-bold text-green-600">
                {routeData.completedCount.toLocaleString("fa-IR")}
              </div>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5">
              <div className="text-sm text-slate-500">در حال اجرا</div>

              <div className="mt-2 text-2xl font-bold text-orange-500">
                {routeData.inProgressCount.toLocaleString("fa-IR")}
              </div>
            </div>

            <div className="rounded-2xl bg-red-50 p-5">
              <div className="text-sm text-slate-500">تأخیرهای ثبت‌شده</div>

              <div className="mt-2 text-2xl font-bold text-red-500">
                {delayRecords.length.toLocaleString("fa-IR")}
              </div>
            </div>
          </div>

          {/* Legend */}

          <Legend />
        </>
      )}
    </section>
  );
}

function averageProgressFormatter(value) {
  return Number(value).toLocaleString("fa-IR", {
    maximumFractionDigits: 1,
  });
}
