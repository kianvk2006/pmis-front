import { useCallback, useEffect, useMemo, useState } from "react";

import { CalendarRange, Plus, Save, Trash2 } from "lucide-react";

import {
  getEVMBaseline,
  getProjectActivities,
  saveEVMBaseline,
} from "@/data/repositories/projectRepository";

const PROJECT_ID = "PROJECT-001";

function createId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()}`;
}

function createActivity() {
  return {
    id: createId(),

    activityId: "",

    budget: "",

    plannedStartDate: "",

    plannedEndDate: "",
  };
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeBudget(value) {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const number = Number(value);

  return Number.isFinite(number) && number >= 0 ? number : 0;
}

export default function BaselineForm() {
  const [activities, setActivities] = useState([]);

  const [projectActivities, setProjectActivities] = useState([]);

  const [message, setMessage] = useState("");

  const loadData = useCallback(() => {
    try {
      const baseline = getEVMBaseline(PROJECT_ID);

      const masterActivities = getProjectActivities(PROJECT_ID);

      setActivities(normalizeArray(baseline?.activities));

      setProjectActivities(normalizeArray(masterActivities));
    } catch (error) {
      console.error("LOAD_EVM_BASELINE_DATA_ERROR", error);

      setActivities([]);

      setProjectActivities([]);
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

  const selectedActivityIds = useMemo(() => {
    return new Set(activities.map((item) => item?.activityId).filter(Boolean));
  }, [activities]);

  const availableActivities = useMemo(() => {
    return projectActivities.filter(
      (activity) => !selectedActivityIds.has(activity.id),
    );
  }, [projectActivities, selectedActivityIds]);

  const totalBudget = useMemo(() => {
    return activities.reduce(
      (total, item) => total + normalizeBudget(item?.budget),
      0,
    );
  }, [activities]);

  const addActivity = () => {
    if (availableActivities.length === 0) {
      setMessage("تمام فعالیت‌های فعال پروژه به Baseline اضافه شده‌اند.");

      return;
    }

    setActivities((currentItems) => [...currentItems, createActivity()]);

    setMessage("");
  };

  const updateActivity = (index, field, value) => {
    setActivities((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,

              [field]: value,
            }
          : item,
      ),
    );

    setMessage("");
  };

  const removeActivity = (index) => {
    setActivities((currentItems) =>
      currentItems.filter((_, itemIndex) => itemIndex !== index),
    );

    setMessage("");
  };

  const getActivityOptions = (currentActivityId) => {
    return projectActivities.filter(
      (activity) =>
        activity.id === currentActivityId ||
        !selectedActivityIds.has(activity.id),
    );
  };

  const getActivityById = (activityId) => {
    return (
      projectActivities.find((activity) => activity.id === activityId) ?? null
    );
  };

  const validateActivities = () => {
    if (activities.length === 0) {
      return "حداقل یک فعالیت به Baseline اضافه کنید.";
    }

    const activityIds = activities
      .map((item) => item?.activityId)
      .filter(Boolean);

    if (activityIds.length !== activities.length) {
      return "برای تمام ردیف‌ها یک فعالیت انتخاب کنید.";
    }

    if (new Set(activityIds).size !== activityIds.length) {
      return "هر فعالیت فقط یک‌بار می‌تواند در Baseline ثبت شود.";
    }

    const hasUnknownActivity = activities.some(
      (item) => !getActivityById(item.activityId),
    );

    if (hasUnknownActivity) {
      return "یکی از فعالیت‌های Baseline در فهرست فعالیت‌های پروژه وجود ندارد.";
    }

    const hasInvalidBudget = activities.some(
      (item) => normalizeBudget(item?.budget) <= 0,
    );

    if (hasInvalidBudget) {
      return "بودجه تمام فعالیت‌ها باید بیشتر از صفر باشد.";
    }

    const hasMissingDate = activities.some(
      (item) => !item?.plannedStartDate || !item?.plannedEndDate,
    );

    if (hasMissingDate) {
      return "تاریخ شروع و پایان تمام فعالیت‌ها را وارد کنید.";
    }

    const hasInvalidDateRange = activities.some((item) => {
      const startDate = new Date(item.plannedStartDate);

      const endDate = new Date(item.plannedEndDate);

      return (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime()) ||
        endDate.getTime() <= startDate.getTime()
      );
    });

    if (hasInvalidDateRange) {
      return "تاریخ پایان هر فعالیت باید بعد از تاریخ شروع باشد.";
    }

    return null;
  };

  const handleSave = () => {
    try {
      const validationError = validateActivities();

      if (validationError) {
        setMessage(validationError);

        return;
      }

      const baselineActivities = activities.map((item) => {
        const masterActivity = getActivityById(item.activityId);

        return {
          /*
              id ردیف Baseline است.

              activityId شناسه پایدار
              Activity Master است.
            */

          id: item.id ?? createId(),

          activityId: masterActivity.id,

          /*
              Snapshot نام و WBS را هم
              نگه می‌داریم تا گزارش‌های
              تاریخی در آینده قابل خواندن
              باقی بمانند.
            */

          activityName: masterActivity.name,

          wbsCode: masterActivity.wbsCode ?? "",

          unit: masterActivity.unit ?? "",

          budget: normalizeBudget(item.budget),

          plannedStartDate: item.plannedStartDate,

          plannedEndDate: item.plannedEndDate,
        };
      });

      const bac = baselineActivities.reduce(
        (total, item) => total + item.budget,
        0,
      );

      const result = saveEVMBaseline({
        projectId: PROJECT_ID,

        bac,

        activities: baselineActivities,
      });

      setActivities(result.baseline.activities);

      setMessage(
        result.operation === "updated"
          ? "Baseline پروژه با موفقیت بروزرسانی شد."
          : "Baseline پروژه با موفقیت ثبت شد.",
      );
    } catch (error) {
      console.error("SAVE_EVM_BASELINE_ERROR", error);

      setMessage("در ذخیره Baseline پروژه خطایی رخ داد.");
    }
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <CalendarRange size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Baseline مدیریت ارزش کسب‌شده
            </h2>

            <p className="mt-1 text-slate-500">
              فعالیت‌های پروژه را انتخاب و بودجه و بازه برنامه‌ای آن‌ها را تعریف
              کنید.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addActivity}
          disabled={availableActivities.length === 0}
          className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
        >
          <Plus size={18} />
          افزودن فعالیت
        </button>
      </div>

      {projectActivities.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="font-bold text-slate-700">
            فعالیتی برای پروژه تعریف نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            ابتدا فعالیت‌های پروژه را در Activity Master تعریف کنید.
          </p>
        </div>
      ) : activities.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="font-bold text-slate-700">
            هنوز Baseline پروژه تعریف نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            فعالیت‌های پروژه را به Baseline اضافه و اطلاعات برنامه‌ای آن‌ها را
            ثبت کنید.
          </p>

          <button
            type="button"
            onClick={addActivity}
            className="mt-5 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            ثبت اولین فعالیت
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((item, index) => {
            const currentMasterActivity = getActivityById(item.activityId);

            const options = getActivityOptions(item.activityId);

            return (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 p-5 lg:grid-cols-12"
              >
                <div className="lg:col-span-4">
                  <label className="mb-2 block text-xs font-semibold text-slate-500">
                    فعالیت پروژه
                  </label>

                  <select
                    value={item.activityId}
                    onChange={(event) =>
                      updateActivity(index, "activityId", event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-400"
                  >
                    <option value="">انتخاب فعالیت</option>

                    {!currentMasterActivity && item.activityId && (
                      <option value={item.activityId}>
                        فعالیت قدیمی یا نامعتبر
                      </option>
                    )}

                    {options.map((activity) => (
                      <option key={activity.id} value={activity.id}>
                        {activity.wbsCode
                          ? `${activity.wbsCode} - ${activity.name}`
                          : activity.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-3">
                  <label className="mb-2 block text-xs font-semibold text-slate-500">
                    بودجه فعالیت
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={item.budget}
                    onChange={(event) =>
                      updateActivity(index, "budget", event.target.value)
                    }
                    placeholder="بودجه"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="mb-2 block text-xs font-semibold text-slate-500">
                    شروع برنامه‌ای
                  </label>

                  <input
                    type="date"
                    value={item.plannedStartDate}
                    onChange={(event) =>
                      updateActivity(
                        index,
                        "plannedStartDate",
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="mb-2 block text-xs font-semibold text-slate-500">
                    پایان برنامه‌ای
                  </label>

                  <input
                    type="date"
                    value={item.plannedEndDate}
                    onChange={(event) =>
                      updateActivity(
                        index,
                        "plannedEndDate",
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400"
                  />
                </div>

                <div className="flex items-end lg:col-span-1">
                  <button
                    type="button"
                    onClick={() => removeActivity(index)}
                    title="حذف از Baseline"
                    className="flex h-[46px] w-full items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activities.length > 0 && (
        <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-sm text-slate-500">بودجه کل Baseline:</span>

            <strong className="mr-2 text-xl text-slate-900">
              {totalBudget.toLocaleString("fa-IR")}
            </strong>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            <Save size={18} />
            ذخیره Baseline
          </button>
        </div>
      )}

      {message && (
        <div className="mt-5 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
          {message}
        </div>
      )}
    </section>
  );
}
