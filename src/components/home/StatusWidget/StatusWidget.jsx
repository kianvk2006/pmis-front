import Card from "@/components/ui/Card";
import Typography from "@/components/ui/Typography";

import StatusItem from "./StatusItem";

import {
  Activity,
  CalendarDays,
  AlertTriangle,
  Users,
} from "lucide-react";

const items = [
  {
    icon: Activity,
    label: "وضعیت پروژه",
    value: "در حال اجرا",
    color: "text-green-600",
  },
  {
    icon: CalendarDays,
    label: "آخرین بروزرسانی",
    value: "امروز",
    color: "text-blue-600",
  },
  {
    icon: AlertTriangle,
    label: "ریسک‌های فعال",
    value: "۳",
    color: "text-orange-600",
  },
  {
    icon: Users,
    label: "اعضای آنلاین",
    value: "۱۲",
    color: "text-violet-600",
  },
];

export default function StatusWidget() {
  return (
    <Card>

      <Typography
        as="h3"
        variant="h3"
        className="mb-6"
      >
        وضعیت پروژه
      </Typography>

      <div className="space-y-4">

        {items.map((item) => (
          <StatusItem
            key={item.label}
            {...item}
          />
        ))}

      </div>

    </Card>
  );
}