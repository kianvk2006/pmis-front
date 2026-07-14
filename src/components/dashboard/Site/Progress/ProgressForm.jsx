import { useEffect, useState } from "react";
import ActivitySelect from "./ActivitySelect";
import KilometerRange from "./KilometerRange";
import QuantityInput from "./QuantityInput";
import ProgressSlider from "./ProgressSlider";
import DurationInput from "./DurationInput";
import SaveProgressButton from "./SaveProgressButton";

import { useSiteReport } from "../store";

const createEmptyProgress = () => ({
  activityId: "",
  fromKm: "",
  toKm: "",
  quantity: "",
  progressPercent: 0,
  workHours: "",
});

export default function ProgressForm() {
  const { report, setProgressItems } = useSiteReport();

  const [draftProgress, setDraftProgress] = useState(createEmptyProgress());

  useEffect(() => {
    const handleRegisterProgress = (event) => {
      const selectedTask = event.detail;

      if (!selectedTask?.activityId) {
        return;
      }

      setDraftProgress((current) => ({
        ...current,

        activityId: selectedTask.activityId,
      }));
    };

    window.addEventListener("site:register-progress", handleRegisterProgress);

    return () => {
      window.removeEventListener(
        "site:register-progress",
        handleRegisterProgress,
      );
    };
  }, []);

  const updateField = (field, value) => {
    setDraftProgress((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!draftProgress.activityId) {
      return;
    }

    const currentItems = Array.isArray(report?.progressItems)
      ? report.progressItems
      : [];

    const newProgressItem = {
      id:
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`,

      activityId: draftProgress.activityId,

      fromKm: draftProgress.fromKm,

      toKm: draftProgress.toKm,

      quantity: Number(draftProgress.quantity) || 0,

      progressPercent: Number(draftProgress.progressPercent) || 0,

      workHours: Number(draftProgress.workHours) || 0,
    };

    setProgressItems([...currentItems, newProgressItem]);

    setDraftProgress(createEmptyProgress());
  };

  return (
    <section
      id="site-progress-form"
      className="scroll-mt-8 rounded-3xl bg-white p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold">ثبت پیشرفت عملیات</h2>

        <p className="mt-2 text-slate-500">
          ثبت عملیات انجام‌شده در فعالیت و محدوده مسیر
        </p>
      </div>

      <div className="space-y-6">
        <ActivitySelect
          value={draftProgress.activityId}
          onChange={(value) => updateField("activityId", value)}
        />

        <KilometerRange
          fromKm={draftProgress.fromKm}
          toKm={draftProgress.toKm}
          onChange={updateField}
        />

        <QuantityInput
          value={draftProgress.quantity}
          onChange={(value) => updateField("quantity", value)}
        />

        <ProgressSlider
          value={draftProgress.progressPercent}
          onChange={(value) => updateField("progressPercent", value)}
        />

        <DurationInput
          value={draftProgress.workHours}
          onChange={(value) => updateField("workHours", value)}
        />

        <SaveProgressButton
          onClick={handleSave}
          disabled={!draftProgress.activityId}
        />
      </div>

      {report?.progressItems?.length > 0 && (
        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="font-bold text-slate-800">عملیات ثبت‌شده امروز</p>

          <p className="mt-2 text-sm text-slate-500">
            {report.progressItems.length} رکورد پیشرفت ثبت شده است.
          </p>
        </div>
      )}
    </section>
  );
}
