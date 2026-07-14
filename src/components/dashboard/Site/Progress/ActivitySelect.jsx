import { useCallback, useEffect, useState } from "react";

import { getProjectActivities } from "@/data/repositories/projectRepository";

const PROJECT_ID = "PROJECT-001";

export default function ActivitySelect({ value, onChange }) {
  const [activities, setActivities] = useState([]);

  const loadActivities = useCallback(() => {
    try {
      const projectActivities = getProjectActivities(PROJECT_ID);

      setActivities(Array.isArray(projectActivities) ? projectActivities : []);
    } catch (error) {
      console.error("LOAD_PROJECT_ACTIVITIES_ERROR", error);

      setActivities([]);
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  useEffect(() => {
    const handleDataUpdated = () => {
      loadActivities();
    };

    window.addEventListener("pmis:data-updated", handleDataUpdated);

    return () => {
      window.removeEventListener("pmis:data-updated", handleDataUpdated);
    };
  }, [loadActivities]);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-600">
        فعالیت اجرایی
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={activities.length === 0}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          p-3
          outline-none
          transition
          focus:border-orange-500
          disabled:cursor-not-allowed
          disabled:bg-slate-100
          disabled:text-slate-400
        "
      >
        <option value="">
          {activities.length === 0
            ? "فعالیتی برای پروژه تعریف نشده است"
            : "انتخاب فعالیت"}
        </option>

        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.wbsCode
              ? `${activity.wbsCode} - ${activity.name}`
              : activity.name}
          </option>
        ))}
      </select>
    </div>
  );
}
