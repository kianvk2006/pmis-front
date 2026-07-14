import DashboardCard from "../DashboardCard";
import NotificationItem from "./NotificationItem";

import { notifications } from "@/mocks/dashboard";

export default function Notifications() {
  return (
    <DashboardCard
      title="اعلان‌ها"
      action={
        <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
          {notifications.length}
        </span>
      }
    >
      <div className="space-y-3">

        {notifications.map((item) => (
          <NotificationItem
            key={item.id}
            {...item}
          />
        ))}

      </div>
    </DashboardCard>
  );
}