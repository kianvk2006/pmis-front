import DashboardCard from "../DashboardCard";
import ActivityItem from "./ActivityItem";

import { todayActivities } from "@/mocks/dashboard";

export default function Activities() {
  return (
    <DashboardCard title="فعالیت‌های امروز">

      <div className="space-y-4">

        {todayActivities.map((activity) => (

          <ActivityItem
            key={activity.id}
            {...activity}
          />

        ))}

      </div>

    </DashboardCard>
  );
}