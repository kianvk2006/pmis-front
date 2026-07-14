import { useCallback, useEffect, useMemo, useState } from "react";

import { getProgressRecords } from "@/data/repositories/projectRepository";

import ActivityRow from "./ActivityRow";

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
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

function getLatestActivityRecords(records) {
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

  return Array.from(activityMap.values()).sort(
    (firstItem, secondItem) =>
      getRecordTime(secondItem) - getRecordTime(firstItem),
  );
}

export default function ActivityTable() {
  const [progressRecords, setProgressRecords] = useState([]);

  const loadData = useCallback(() => {
    try {
      setProgressRecords(normalizeArray(getProgressRecords()));
    } catch (error) {
      console.error("LOAD_EXECUTION_ACTIVITIES_ERROR", error);

      setProgressRecords([]);
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

  const activities = useMemo(
    () => getLatestActivityRecords(progressRecords),
    [progressRecords],
  );

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">آخرین وضعیت فعالیت‌های اجرایی</h2>

        <p className="mt-2 text-slate-500">
          آخرین اطلاعات ثبت‌شده برای هر فعالیت از گزارش‌های کارگاه
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="font-bold text-slate-700">
            هنوز فعالیت اجرایی ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            پس از ثبت پیشرفت فعالیت‌ها در گزارش کارگاه، اطلاعات در این بخش نمایش
            داده می‌شود.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-5 py-4">فعالیت</th>

                <th className="px-5 py-4">مقدار انجام‌شده</th>

                <th className="px-5 py-4">واحد</th>

                <th className="px-5 py-4">پیشرفت</th>

                <th className="px-5 py-4">آخرین گزارش</th>

                <th className="px-5 py-4">وضعیت</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((item) => (
                <ActivityRow key={getActivityId(item)} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
