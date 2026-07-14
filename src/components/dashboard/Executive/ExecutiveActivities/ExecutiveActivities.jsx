import { useEffect, useState } from "react";

import ActivityItem from "./ActivityItem";

import { getExecutiveActivities } from "@/services/executiveDashboardService";

export default function ExecutiveActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setActivities(getExecutiveActivities());
  }, []);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h3 className="mb-8 text-xl font-bold">آخرین فعالیت‌های پروژه</h3>

      <div className="space-y-7">
        {activities.length === 0 ? (
          <div className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">
            هنوز فعالیتی ثبت نشده است.
          </div>
        ) : (
          activities.map((activity) => (
            <ActivityItem key={activity.id} {...activity} />
          ))
        )}
      </div>
    </div>
  );
}
